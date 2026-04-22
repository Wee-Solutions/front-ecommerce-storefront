import type { Metadata } from "next";
import { AccountSideMenu } from "@/features/account/account-side-menu";
import { OrdersList } from "@/features/account/orders-list";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getServerLocale } from "@/lib/i18n/server-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  return { title: dict.orders.title };
}

export default async function OrdersPage() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-(--sf-color-primary) md:text-3xl">
        {dict.orders.title}
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-(--sf-color-muted)">
        {dict.orders.subtitle}
      </p>
      <div className="mt-8 grid gap-6 lg:grid-cols-[15rem_1fr]">
        <AccountSideMenu active="orders" />
        <OrdersList />
      </div>
    </div>
  );
}
