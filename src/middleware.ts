import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  isLocale,
  resolveLocaleFromAcceptLanguage,
  type Locale,
} from "@/lib/i18n/locale-config";
import { resolveStoreFromHost } from "@/tenants/registry";

const LOCALE_COOKIE = "sf-locale";
const LOCALE_MAX_AGE = 60 * 60 * 24 * 365;

function resolveRequestLocale(request: NextRequest): Locale {
  const fromCookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (isLocale(fromCookie)) return fromCookie;
  return resolveLocaleFromAcceptLanguage(
    request.headers.get("accept-language"),
  );
}

export function middleware(request: NextRequest) {
  const locale = resolveRequestLocale(request);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-sf-locale", locale);

  const hostHeader = request.headers.get("host") ?? "";
  const hostname = hostHeader.split(":")[0]?.toLowerCase() ?? "";
  const store = resolveStoreFromHost(hostname);

  if (!store) {
    const res = NextResponse.next({
      request: { headers: requestHeaders },
    });
    if (!request.cookies.get(LOCALE_COOKIE)) {
      res.cookies.set(LOCALE_COOKIE, locale, {
        path: "/",
        sameSite: "lax",
        maxAge: LOCALE_MAX_AGE,
      });
    }
    return res;
  }

  requestHeaders.set("x-sf-theme-id", store.themeId);

  const res = NextResponse.next({
    request: { headers: requestHeaders },
  });

  if (!request.cookies.get(LOCALE_COOKIE)) {
    res.cookies.set(LOCALE_COOKIE, locale, {
      path: "/",
      sameSite: "lax",
      maxAge: LOCALE_MAX_AGE,
    });
  }

  res.cookies.set("sf-theme-id", store.themeId, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
  });

  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
