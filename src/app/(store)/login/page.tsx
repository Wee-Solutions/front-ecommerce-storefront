import Link from "next/link";
import type { Metadata } from "next";
import { LoginForm } from "@/features/auth/login-form";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getServerLocale } from "@/lib/i18n/server-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  return { title: dict.auth.loginTitle };
}

export default async function LoginPage() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-[var(--sf-color-primary)] md:text-3xl">
        {dict.auth.loginTitle}
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-[var(--sf-color-muted)]">
        {dict.auth.loginSubtitle}
      </p>
      <div className="mt-10">
        <LoginForm />
      </div>
      <p className="mt-10 text-center text-sm text-[var(--sf-color-muted)]">
        {dict.auth.newHere}{" "}
        <Link
          href="/register"
          className="font-semibold text-[var(--sf-color-accent)] transition hover:underline"
        >
          {dict.auth.registerCta}
        </Link>
      </p>
    </div>
  );
}
