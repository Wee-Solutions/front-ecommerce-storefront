"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Headphones, RotateCcw, Truck } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

export function TrustStrip({
  shipping,
  returns,
  concierge,
}: {
  shipping: string;
  returns: string;
  concierge: string;
}) {
  const reduce = useReducedMotion();
  const items = [
    { icon: Truck, label: shipping },
    { icon: RotateCcw, label: returns },
    { icon: Headphones, label: concierge },
  ] as const;

  if (reduce) {
    return (
      <div className="grid gap-6 border-y border-border/60 bg-muted/20 py-8 sm:grid-cols-3">
        {items.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-3 text-center sm:flex-row sm:text-start"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border/80 bg-card text-primary shadow-sm">
              <Icon className="size-5" strokeWidth={1.5} aria-hidden />
            </span>
            <p className="text-sm font-medium leading-snug text-foreground">
              {label}
            </p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease }}
      className="grid gap-6 border-y border-border/60 bg-gradient-to-b from-muted/15 via-transparent to-muted/15 py-9 sm:grid-cols-3"
    >
      {items.map(({ icon: Icon, label }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease, delay: i * 0.08 }}
          className="flex flex-col items-center gap-3 text-center sm:flex-row sm:text-start"
        >
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border/80 bg-card text-primary shadow-sm ring-1 ring-primary/5">
            <Icon className="size-5" strokeWidth={1.5} aria-hidden />
          </span>
          <p className="text-sm font-medium leading-snug tracking-tight text-foreground">
            {label}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}
