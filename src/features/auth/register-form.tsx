"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { AuthChannelTabs } from "@/components/auth/auth-channel-tabs";
import { AuthContactField } from "@/components/auth/auth-contact-field";
import { AuthOtpField } from "@/components/auth/auth-otp-field";
import { Input } from "@/components/ui/input";
import { useTranslations } from "@/contexts/locale-context";
import { useVendor } from "@/contexts/vendor-context";
import {
  resendVerificationCode,
  sendVerificationCode,
} from "@/services/auth.service";
import { registerCustomer } from "@/services/customers.service";
import { DispatchMethod, VerificationType } from "@/types/api/auth";
import { GatewayRequestError } from "@/types/api/gateway";
import { cn } from "@/lib/utils";
import { useCustomerSession } from "./customer-session";

const textFieldShell =
  "relative flex min-h-11 items-center rounded-xl border border-border bg-card/70 shadow-sm transition-[box-shadow,border-color] focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/35";

export function RegisterForm() {
  const t = useTranslations();
  const { language } = useVendor();
  const router = useRouter();
  const setSession = useCustomerSession((s) => s.setSession);

  const channelGroupLabelId = useId();
  const contactPanelId = useId();
  const destinationFieldId = useId();
  const firstNameId = useId();
  const lastNameId = useId();
  const optionalEmailId = useId();
  const secondaryPhoneId = useId();
  const codeFieldId = useId();

  const [channel, setChannel] = useState<"sms" | "email">("sms");
  const [destination, setDestination] = useState("");
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
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
          type: VerificationType.CustomerRegistration,
          dispatchMethod,
          destination: destination.trim(),
        },
        language,
      );
    },
    onSuccess: (data) => {
      setVerificationId(data.verificationId);
      setMessage(t.auth.msgCodeSent);
      if (channel === "sms") setPhoneNumber(destination.trim());
      if (channel === "email") setEmail(destination.trim());
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

  const registerMutation = useMutation({
    mutationFn: async () => {
      if (!verificationId) throw new Error("Send a code first.");
      return registerCustomer(
        {
          verificationId,
          verificationCode: code.trim(),
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim() || undefined,
          phoneNumber: phoneNumber.trim(),
        },
        language,
      );
    },
    onSuccess: (data) => {
      setSession({
        accessToken: data.accessToken,
        customerId: data.customerId,
        tokenExpiresAt: data.tokenExpiresAt,
      });
      router.push("/account");
      router.refresh();
    },
    onError: (e: unknown) => {
      setMessage(
        e instanceof GatewayRequestError ? e.message : t.auth.errRegister
      );
    },
  });

  const primaryClass =
    "w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-md transition hover:brightness-110 disabled:pointer-events-none disabled:opacity-40";

  const nameLabelClass =
    "block text-sm font-medium leading-snug text-foreground";

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
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor={firstNameId} className={nameLabelClass}>
                {t.auth.firstName}
              </label>
              <div className={cn(textFieldShell)}>
                <Input
                  id={firstNameId}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  autoComplete="given-name"
                  className="h-11 min-h-11 border-0 bg-transparent px-3.5 shadow-none focus-visible:ring-0"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor={lastNameId} className={nameLabelClass}>
                {t.auth.lastName}
              </label>
              <div className={cn(textFieldShell)}>
                <Input
                  id={lastNameId}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  autoComplete="family-name"
                  className="h-11 min-h-11 border-0 bg-transparent px-3.5 shadow-none focus-visible:ring-0"
                />
              </div>
            </div>
          </div>
          {channel === "sms" && (
            <AuthContactField
              id={optionalEmailId}
              label={t.auth.emailOptional}
              type="email"
              value={email}
              onChange={setEmail}
              placeholder={t.auth.emailPlaceholder}
              hint={t.auth.emailHint}
              autoComplete="email"
            />
          )}
          {channel === "email" && (
            <AuthContactField
              id={secondaryPhoneId}
              label={t.auth.phone}
              type="tel"
              value={phoneNumber}
              onChange={setPhoneNumber}
              placeholder={t.auth.phonePlaceholder}
              hint={t.auth.phoneHint}
              autoComplete="tel"
            />
          )}
          <AuthOtpField
            id={codeFieldId}
            label={t.auth.code}
            value={code}
            onChange={setCode}
            hint={t.auth.codeHint}
            disabled={registerMutation.isPending}
          />
          <button
            type="button"
            disabled={
              registerMutation.isPending ||
              !code.trim() ||
              !firstName.trim() ||
              !lastName.trim() ||
              !phoneNumber.trim()
            }
            onClick={() => registerMutation.mutate()}
            className={primaryClass}
          >
            {t.auth.createAccount}
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
