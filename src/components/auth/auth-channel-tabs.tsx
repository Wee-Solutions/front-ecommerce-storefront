"use client";

import { useId } from "react";
import { Mail, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

type Channel = "sms" | "email";

type AuthChannelTabsProps = {
  value: Channel;
  onChange: (channel: Channel) => void;
  smsLabel: string;
  emailLabel: string;
  groupLabel: string;
  /** Stable id for the group caption (tablist `aria-labelledby`). */
  groupLabelId: string;
  /** `id` for the tabpanel that wraps the contact field (must match `aria-controls`). */
  contactPanelId: string;
  disabled?: boolean;
};

export function AuthChannelTabs({
  value,
  onChange,
  smsLabel,
  emailLabel,
  groupLabel,
  groupLabelId,
  contactPanelId,
  disabled,
}: AuthChannelTabsProps) {
  const baseId = useId();
  const tabClass = (active: boolean) =>
    cn(
      "relative flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      active
        ? "bg-card text-foreground shadow-sm"
        : "text-muted-foreground hover:text-foreground"
    );

  return (
    <div className="space-y-2">
      <p
        className="text-sm font-medium leading-snug text-foreground"
        id={groupLabelId}
      >
        {groupLabel}
      </p>
      <div
        role="tablist"
        aria-labelledby={groupLabelId}
        className="flex gap-1 rounded-2xl border border-border bg-muted/40 p-1"
      >
        <button
          type="button"
          role="tab"
          id={`${baseId}-tab-sms`}
          aria-selected={value === "sms"}
          aria-controls={contactPanelId}
          tabIndex={value === "sms" ? 0 : -1}
          disabled={disabled}
          className={tabClass(value === "sms")}
          onClick={() => onChange("sms")}
        >
          <MessageSquare className="size-4 opacity-80" aria-hidden />
          {smsLabel}
        </button>
        <button
          type="button"
          role="tab"
          id={`${baseId}-tab-email`}
          aria-selected={value === "email"}
          aria-controls={contactPanelId}
          tabIndex={value === "email" ? 0 : -1}
          disabled={disabled}
          className={tabClass(value === "email")}
          onClick={() => onChange("email")}
        >
          <Mail className="size-4 opacity-80" aria-hidden />
          {emailLabel}
        </button>
      </div>
    </div>
  );
}
