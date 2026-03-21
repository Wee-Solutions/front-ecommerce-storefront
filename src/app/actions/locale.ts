"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { isLocale } from "@/lib/i18n/locale-config";

const COOKIE = "sf-locale";
const MAX_AGE = 60 * 60 * 24 * 365;

export async function setUserLocale(locale: string) {
  if (!isLocale(locale)) return;
  const jar = await cookies();
  jar.set(COOKIE, locale, {
    path: "/",
    sameSite: "lax",
    maxAge: MAX_AGE,
  });
  revalidatePath("/", "layout");
}

export async function setUserLocaleForm(formData: FormData) {
  const raw = formData.get("locale");
  if (typeof raw !== "string" || !isLocale(raw)) return;
  await setUserLocale(raw);
}
