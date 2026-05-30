"use client";

import { useEffect } from "react";
import { useVendor } from "@/contexts/vendor-context";
import { useCustomerSession } from "@/features/auth/customer-session";
import {
  flushEventBuffer,
  setEventGatewayContext,
} from "@/features/events/event-buffer";

export function EventTrackerLifecycle() {
  const { language } = useVendor();
  const accessToken = useCustomerSession((s) => s.accessToken);

  useEffect(() => {
    setEventGatewayContext({ language, accessToken });
  }, [language, accessToken]);

  useEffect(() => {
    const flush = () => {
      void flushEventBuffer();
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") flush();
    };

    window.addEventListener("pagehide", flush);
    window.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("beforeunload", flush);

    return () => {
      window.removeEventListener("pagehide", flush);
      window.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("beforeunload", flush);
    };
  }, []);

  return null;
}
