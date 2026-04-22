"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { AuthContactField } from "@/components/auth/auth-contact-field";
import { AuthOtpField } from "@/components/auth/auth-otp-field";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLocale, useTranslations } from "@/contexts/locale-context";
import { useVendor } from "@/contexts/vendor-context";
import { sendVerificationCode } from "@/services/auth.service";
import {
  getCustomerProfile,
  updateCustomerPhoneNumber,
  updateCustomerProfile,
} from "@/services/customers.service";
import { DispatchMethod, VerificationType } from "@/types/api/auth";
import { GatewayRequestError } from "@/types/api/gateway";
import { useCustomerSession } from "@/features/auth/customer-session";

const RESEND_WAIT_SEC = 30;

export function AccountDashboard() {
  const t = useTranslations();
  const locale = useLocale();
  const { language } = useVendor();
  const { accessToken, clear } = useCustomerSession();
  const [message, setMessage] = useState<string | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);

  const profileQuery = useQuery({
    queryKey: ["customer-profile", language, accessToken],
    queryFn: async () => {
      if (!accessToken) throw new Error("Not authenticated");
      return getCustomerProfile(accessToken, language);
    },
    enabled: Boolean(accessToken),
  });

  const profile = profileQuery.data;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [codeLength, setCodeLength] = useState(6);
  const [resendCountdown, setResendCountdown] = useState(0);

  useEffect(() => {
    if (resendCountdown <= 0) return;
    const id = setInterval(() => {
      setResendCountdown((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [resendCountdown]);

  const saveProfileMutation = useMutation({
    mutationFn: async () => {
      if (!accessToken) throw new Error("Not authenticated");
      return updateCustomerProfile(
        {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim() || null,
        },
        accessToken,
        language,
      );
    },
    onSuccess: async () => {
      setMessage(t.account.profileUpdated);
      toast.success(t.account.profileUpdated);
      setIsEditingProfile(false);
      await profileQuery.refetch();
    },
    onError: (e: unknown) => {
      const txt =
        e instanceof GatewayRequestError ? e.message : t.account.profileUpdateFailed;
      setMessage(txt);
      toast.error(txt);
    },
  });

  const sendPhoneCodeMutation = useMutation({
    mutationFn: async () =>
      sendVerificationCode(
        {
          type: VerificationType.CustomerUpdatePhone,
          dispatchMethod: DispatchMethod.SMS,
          destination: newPhone.trim(),
        },
        language,
      ),
    onSuccess: (data) => {
      setVerificationId(data.verificationId);
      setCodeLength(Math.max(4, data.codeLength || 6));
      setCode("");
      setResendCountdown(RESEND_WAIT_SEC);
      setMessage(t.auth.msgCodeSent);
      toast.success(t.auth.msgCodeSent);
    },
    onError: (e: unknown) => {
      const txt = e instanceof GatewayRequestError ? e.message : t.auth.errSendCode;
      setMessage(txt);
      toast.error(txt);
    },
  });

  const updatePhoneMutation = useMutation({
    mutationFn: async () => {
      if (!accessToken || !verificationId) throw new Error("Missing verification");
      return updateCustomerPhoneNumber(
        {
          newPhoneNumber: newPhone.trim(),
          verificationId,
          verificationCode: code.trim(),
        },
        accessToken,
        language,
      );
    },
    onSuccess: async () => {
      setMessage(t.account.phoneUpdated);
      toast.success(t.account.phoneUpdated);
      setIsEditingPhone(false);
      setVerificationId(null);
      setCode("");
      await profileQuery.refetch();
    },
    onError: (e: unknown) => {
      const txt =
        e instanceof GatewayRequestError ? e.message : t.account.phoneUpdateFailed;
      setMessage(txt);
      toast.error(txt);
    },
  });

  if (!accessToken) {
    return (
      <Card className="mt-8">
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">{t.account.signedOut}</p>
          <a href="/login" className="mt-4 inline-block text-sm font-semibold text-primary hover:underline">
            {t.account.signedOutCta}
          </a>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-border/60 bg-muted/20 px-4 py-3">
        <p className="text-sm text-muted-foreground">
          {profile ? `#${profile.number} · ${new Date(profile.createdAt).toLocaleDateString(locale)}` : t.account.signedInAs}
        </p>
        <Button variant="ghost" size="sm" onClick={() => clear()}>
          {t.account.signOut}
        </Button>
      </div>

      <Card id="profile">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{t.account.title}</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setIsEditingProfile((v) => !v);
              if (profile) {
                setFirstName(profile.firstName ?? "");
                setLastName(profile.lastName ?? "");
                setEmail(profile.email ?? "");
              }
            }}
          >
            {isEditingProfile ? t.account.cancel : t.account.edit}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isEditingProfile ? (
            <dl className="grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-xs text-muted-foreground">{t.auth.firstName}</dt>
                <dd className="mt-1 rounded-lg border border-border/60 bg-muted/20 px-3 py-2 font-medium">
                  {profile?.firstName || "—"}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">{t.auth.lastName}</dt>
                <dd className="mt-1 rounded-lg border border-border/60 bg-muted/20 px-3 py-2 font-medium">
                  {profile?.lastName || "—"}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs text-muted-foreground">{t.auth.emailLabel}</dt>
                <dd className="mt-1 rounded-lg border border-border/60 bg-muted/20 px-3 py-2 font-medium">
                  {profile?.email || "—"}
                </dd>
              </div>
            </dl>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t.auth.firstName}</label>
                  <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t.auth.lastName}</label>
                  <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
              </div>
              <AuthContactField
                id="account-email"
                label={t.auth.emailLabel}
                type="email"
                value={email}
                onChange={setEmail}
                placeholder={t.auth.emailPlaceholder}
                hint={t.auth.emailHint}
                autoComplete="email"
              />
              <Button
                onClick={() => saveProfileMutation.mutate()}
                disabled={
                  saveProfileMutation.isPending ||
                  !firstName.trim() ||
                  !lastName.trim()
                }
              >
                {t.account.saveProfile}
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      <Card id="shipping-details">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{t.auth.phone}</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setIsEditingPhone((v) => !v);
              setVerificationId(null);
              setCode("");
              if (profile) setNewPhone(profile.phoneNumber ?? "");
            }}
          >
            {isEditingPhone ? t.account.cancel : t.account.edit}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isEditingPhone ? (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">{t.auth.phone}</p>
              <p className="rounded-lg border border-border/60 bg-muted/20 px-3 py-2 text-sm font-medium">
                {profile?.phoneNumber || "—"}
              </p>
            </div>
          ) : (
            <>
              <AuthContactField
                id="account-phone"
                label={t.auth.phone}
                type="tel"
                value={newPhone}
                onChange={setNewPhone}
                placeholder={t.auth.phonePlaceholder}
                hint={t.auth.phoneHint}
                autoComplete="tel"
              />
              {!verificationId ? (
                <Button
                  onClick={() => sendPhoneCodeMutation.mutate()}
                  disabled={sendPhoneCodeMutation.isPending || !newPhone.trim()}
                >
                  {t.auth.sendCode}
                </Button>
              ) : (
                <>
                  <AuthOtpField
                    id="account-phone-code"
                    label={t.auth.code}
                    value={code}
                    onChange={setCode}
                    codeLength={codeLength}
                    hint={t.auth.codeHint}
                    disabled={updatePhoneMutation.isPending}
                  />
                  <div className="flex flex-wrap items-center gap-2">
                    <Button
                      onClick={() => updatePhoneMutation.mutate()}
                      disabled={updatePhoneMutation.isPending || !code.trim()}
                    >
                      {t.account.verifyAndUpdatePhone}
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => sendPhoneCodeMutation.mutate()}
                      disabled={sendPhoneCodeMutation.isPending || resendCountdown > 0}
                    >
                      {resendCountdown > 0
                        ? `${t.auth.resend} (${resendCountdown}s)`
                        : t.auth.resend}
                    </Button>
                  </div>
                </>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}
    </div>
  );
}

