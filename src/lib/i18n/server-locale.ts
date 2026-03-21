import { cookies, headers } from "next/headers";
import { isLocale, type Locale } from "./locale-config";

export async function getServerLocale(): Promise<Locale> {
  const h = await headers();
  const fromMiddleware = h.get("x-sf-locale");
  if (isLocale(fromMiddleware)) return fromMiddleware;

  const cookieStore = await cookies();
  const fromCookie = cookieStore.get("sf-locale")?.value;
  if (isLocale(fromCookie)) return fromCookie;

  return "en";
}
