import type { Metadata } from "next";
import { CheckoutForm } from "@/features/checkout/checkout-form";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getServerLocale } from "@/lib/i18n/server-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  return { title: dict.checkout.title };
}

export default async function CheckoutPage() {
  const dict = getDictionary(await getServerLocale());

  return (
    <div className="mx-auto max-w-2xl px-1 sm:px-0">
      <h1 className="text-2xl font-semibold tracking-tight text-[var(--sf-color-primary)] md:text-3xl">
        {dict.checkout.title}
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-[var(--sf-color-muted)]">
        {dict.checkout.subtitle}
      </p>
      <CheckoutForm />
    </div>
  );
}
