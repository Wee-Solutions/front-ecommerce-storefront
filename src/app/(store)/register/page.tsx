import Link from "next/link";
import type { Metadata } from "next";
import { RegisterForm } from "@/features/auth/register-form";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getServerLocale } from "@/lib/i18n/server-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  return { title: dict.auth.registerTitle };
}

export default async function RegisterPage() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-[var(--sf-color-primary)] md:text-3xl">
        {dict.auth.registerTitle}
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-[var(--sf-color-muted)]">
        {dict.auth.registerSubtitle}
      </p>
      <div className="mt-10">
        <RegisterForm />
      </div>
      <p className="mt-10 text-center text-sm text-[var(--sf-color-muted)]">
        {dict.auth.haveAccount}{" "}
        <Link
          href="/login"
          className="font-semibold text-[var(--sf-color-accent)] transition hover:underline"
        >
          {dict.auth.loginCta}
        </Link>
      </p>
    </div>
  );
}
