import type { Metadata } from "next";
import { AccountSideMenu } from "@/features/account/account-side-menu";
import { ShippingDetails } from "@/features/account/shipping-details";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getServerLocale } from "@/lib/i18n/server-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  return { title: dict.account.shippingDetails };
}

export default async function ShippingPage() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-(--sf-color-primary) md:text-3xl">
        {dict.account.shippingDetails}
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-(--sf-color-muted)">
        {dict.account.subtitle}
      </p>
      <div className="mt-8 grid gap-6 lg:grid-cols-[15rem_1fr]">
        <AccountSideMenu active="shipping" />
        <ShippingDetails />
      </div>
    </div>
  );
}
