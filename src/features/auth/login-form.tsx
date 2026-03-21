"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import { useTranslations } from "@/contexts/locale-context";
import { useVendor } from "@/contexts/vendor-context";
import {
  loginCustomer,
  resendVerificationCode,
  sendVerificationCode,
} from "@/services/auth.service";
import { DispatchMethod, VerificationType } from "@/types/api/auth";
import { GatewayRequestError } from "@/types/api/gateway";
import { useCustomerSession } from "./customer-session";

export function LoginForm() {
  const t = useTranslations();
  const { vendorCode, language } = useVendor();
  const router = useRouter();
  const setSession = useCustomerSession((s) => s.setSession);

  const [channel, setChannel] = useState<"sms" | "email">("sms");
  const [destination, setDestination] = useState("");
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const pill = (active: boolean) =>
    clsx(
      "flex-1 rounded-full border py-2.5 text-sm font-medium transition",
      active
        ? "border-[var(--sf-color-accent)] bg-[var(--sf-color-surface)] shadow-sm"
        : "border-[var(--sf-color-border)] hover:border-[var(--sf-color-muted)]"
    );

  const sendMutation = useMutation({
    mutationFn: async () => {
      setMessage(null);
      const dispatchMethod =
        channel === "sms" ? DispatchMethod.SMS : DispatchMethod.Email;
      return sendVerificationCode(
        vendorCode,
        {
          type: VerificationType.CustomerLogin,
          dispatchMethod,
          destination: destination.trim(),
        },
        language
      );
    },
    onSuccess: (data) => {
      setVerificationId(data.verificationId);
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
      return resendVerificationCode(
        vendorCode,
        { verificationId },
        language
      );
    },
    onSuccess: () => setMessage(t.auth.msgCodeResent),
    onError: (e: unknown) => {
      setMessage(
        e instanceof GatewayRequestError ? e.message : t.auth.errResend
      );
    },
  });

  const loginMutation = useMutation({
    mutationFn: async () => {
      if (!verificationId) throw new Error("Send a code first.");
      return loginCustomer(
        vendorCode,
        {
          verificationId,
          verificationCode: code.trim(),
          phoneNumber: channel === "sms" ? destination.trim() : undefined,
          email: channel === "email" ? destination.trim() : undefined,
          isPersistentLogin: true,
        },
        language
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
        e instanceof GatewayRequestError ? e.message : t.auth.errLogin
      );
    },
  });

  const inputClass =
    "mt-1.5 w-full rounded-xl border border-[var(--sf-color-border)] px-3 py-2.5 text-sm transition focus:border-[var(--sf-color-accent)]/40";

  return (
    <div className="mx-auto max-w-md space-y-6">
      {!verificationId ? (
        <>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setChannel("sms")}
              className={pill(channel === "sms")}
            >
              {t.auth.sms}
            </button>
            <button
              type="button"
              onClick={() => setChannel("email")}
              className={pill(channel === "email")}
            >
              {t.auth.email}
            </button>
          </div>
          <div>
            <label className="text-sm font-medium text-[var(--sf-color-muted)]">
              {channel === "sms" ? t.auth.phone : t.auth.emailLabel}
            </label>
            <input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              type={channel === "sms" ? "tel" : "email"}
              className={inputClass}
              autoComplete={channel === "sms" ? "tel" : "email"}
            />
          </div>
          <button
            type="button"
            disabled={sendMutation.isPending || !destination.trim()}
            onClick={() => sendMutation.mutate()}
            className="w-full rounded-full bg-[var(--sf-color-primary)] py-3 text-sm font-semibold text-[var(--sf-color-primary-fg)] shadow-md transition hover:brightness-110 disabled:opacity-40"
          >
            {t.auth.sendCode}
          </button>
        </>
      ) : (
        <>
          <div>
            <label className="text-sm font-medium text-[var(--sf-color-muted)]">
              {t.auth.code}
            </label>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className={`${inputClass} tracking-widest`}
              autoComplete="one-time-code"
            />
          </div>
          <button
            type="button"
            disabled={loginMutation.isPending || !code.trim()}
            onClick={() => loginMutation.mutate()}
            className="w-full rounded-full bg-[var(--sf-color-primary)] py-3 text-sm font-semibold text-[var(--sf-color-primary-fg)] shadow-md transition hover:brightness-110 disabled:opacity-40"
          >
            {t.auth.signIn}
          </button>
          <button
            type="button"
            disabled={resendMutation.isPending}
            onClick={() => resendMutation.mutate()}
            className="w-full text-sm font-medium text-[var(--sf-color-accent)] transition hover:underline"
          >
            {t.auth.resend}
          </button>
        </>
      )}
      {message && (
        <p className="text-sm text-[var(--sf-color-muted)]" role="status">
          {message}
        </p>
      )}
    </div>
  );
}
