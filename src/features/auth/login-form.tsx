"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { AuthChannelTabs } from "@/components/auth/auth-channel-tabs";
import { AuthContactField } from "@/components/auth/auth-contact-field";
import { AuthOtpField } from "@/components/auth/auth-otp-field";
import { useTranslations } from "@/contexts/locale-context";
import { useVendor } from "@/contexts/vendor-context";
import {
  loginCustomer,
  resendVerificationCode,
  sendVerificationCode,
} from "@/services/auth.service";
import { DispatchMethod, VerificationType } from "@/types/api/auth";
import { GatewayRequestError } from "@/types/api/gateway";
import { cartQueryKey, invalidateCartQueries } from "@/features/cart/cart-query";
import { getCart } from "@/services/carts.service";
import { trackLogin } from "@/features/events/track-events";
import { useCustomerSession } from "./customer-session";

export function LoginForm() {
  const t = useTranslations();
  const { language } = useVendor();
  const router = useRouter();
  const queryClient = useQueryClient();
  const setSession = useCustomerSession((s) => s.setSession);
  const channelGroupLabelId = useId();
  const contactPanelId = useId();
  const destinationFieldId = useId();
  const codeFieldId = useId();

  const [channel, setChannel] = useState<"sms" | "email">("sms");
  const [destination, setDestination] = useState("");
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const selectChannel = (next: "sms" | "email") => {
    if (next === channel) return;
    setChannel(next);
    setDestination("");
    setMessage(null);
  };

  const sendMutation = useMutation({
    mutationFn: async () => {
      setMessage(null);
      const dispatchMethod =
        channel === "sms" ? DispatchMethod.SMS : DispatchMethod.Email;
      return sendVerificationCode(
        {
          type: VerificationType.CustomerLogin,
          dispatchMethod,
          destination: destination.trim(),
        },
        language,
      );
    },
    onSuccess: (data) => {
      setVerificationId(data.verificationId);
      setCode("");
      setMessage(t.auth.msgCodeSent);
    },
    onError: (e: unknown) => {
      setMessage(
        e instanceof GatewayRequestError ? e.message : t.auth.errSendCode
      );
    },
  });

  const resendMutation = useMutation({
    mutationFn: async () => {
      if (!verificationId) return;
      return resendVerificationCode({ verificationId }, language);
    },
    onSuccess: () => setMessage(t.auth.msgCodeResent),
    onError: (e: unknown) => {
      setMessage(
        e instanceof GatewayRequestError ? e.message : t.auth.errResend
      );
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (verificationCode: string) => {
      if (!verificationId) throw new Error("Send a code first.");
      return loginCustomer(
        {
          verificationId,
          verificationCode: verificationCode.trim(),
          isPersistent: true,
        },
        language,
      );
    },
    onSuccess: async (data) => {
      trackLogin();
      setSession({
        accessToken: data.accessToken,
        customerId: data.customerId,
        tokenExpiresAt: data.tokenExpiresAt,
      });
      await queryClient.fetchQuery({
        queryKey: cartQueryKey(language, data.accessToken),
        queryFn: () =>
          getCart({ language, accessToken: data.accessToken }),
      });
      await invalidateCartQueries(queryClient, language);
      router.push("/account");
      router.refresh();
    },
    onError: (e: unknown) => {
      setMessage(
        e instanceof GatewayRequestError ? e.message : t.auth.errLogin
      );
    },
  });

  const primaryClass =
    "w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-md transition hover:brightness-110 disabled:pointer-events-none disabled:opacity-40";

  return (
    <div className="mx-auto max-w-md space-y-6">
      {!verificationId ? (
        <>
          <AuthChannelTabs
            value={channel}
            onChange={selectChannel}
            smsLabel={t.auth.sms}
            emailLabel={t.auth.email}
            groupLabel={t.auth.verifyChannel}
            groupLabelId={channelGroupLabelId}
            contactPanelId={contactPanelId}
            disabled={sendMutation.isPending}
          />
          <div
            id={contactPanelId}
            role="tabpanel"
            aria-labelledby={channelGroupLabelId}
            className="space-y-2"
          >
            <AuthContactField
              id={destinationFieldId}
              label={
                channel === "sms" ? t.auth.phone : t.auth.emailLabel
              }
              type={channel === "sms" ? "tel" : "email"}
              value={destination}
              onChange={setDestination}
              placeholder={
                channel === "sms"
                  ? t.auth.phonePlaceholder
                  : t.auth.emailPlaceholder
              }
              hint={
                channel === "sms" ? t.auth.phoneHint : t.auth.emailHint
              }
              disabled={sendMutation.isPending}
              autoComplete={channel === "sms" ? "tel" : "email"}
              onEnter={() => {
                if (!sendMutation.isPending && destination.trim()) {
                  sendMutation.mutate();
                }
              }}
            />
          </div>
          <button
            type="button"
            disabled={sendMutation.isPending || !destination.trim()}
            onClick={() => sendMutation.mutate()}
            className={primaryClass}
          >
            {t.auth.sendCode}
          </button>
        </>
      ) : (
        <>
          <AuthOtpField
            id={codeFieldId}
            label={t.auth.code}
            value={code}
            onChange={setCode}
            hint={t.auth.codeHint}
            disabled={loginMutation.isPending}
            autoFocus
            onComplete={(completedCode) => {
              if (!loginMutation.isPending) {
                loginMutation.mutate(completedCode);
              }
            }}
          />
          <button
            type="button"
            disabled={loginMutation.isPending || !code.trim()}
            onClick={() => loginMutation.mutate(code)}
            className={primaryClass}
          >
            {t.auth.signIn}
          </button>
          <button
            type="button"
            disabled={resendMutation.isPending}
            onClick={() => resendMutation.mutate()}
            className="w-full text-sm font-medium text-primary transition hover:underline"
          >
            {t.auth.resend}
          </button>
        </>
      )}
      {message && (
        <p className="text-sm text-muted-foreground" role="status">
          {message}
        </p>
      )}
    </div>
  );
}
