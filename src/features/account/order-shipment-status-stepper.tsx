"use client";

import { Fragment } from "react";
import { useTranslations } from "@/contexts/locale-context";
import {
  shipmentProgressStepIndex,
  shipmentProgressStepLabels,
  shipmentStatusLabel,
} from "@/lib/order-status-labels";
import { cn } from "@/lib/utils";
import { OrderShipmentStatus } from "@/types/api/order";

type StepVisualState = "complete" | "current" | "upcoming" | "cancelled";

function stepVisualState(
  stepIndex: number,
  activeIndex: number,
  isCancelled: boolean,
): StepVisualState {
  if (isCancelled) return "cancelled";
  if (stepIndex < activeIndex) return "complete";
  if (stepIndex === activeIndex) return "current";
  return "upcoming";
}

function dotClassName(state: StepVisualState) {
  switch (state) {
    case "complete":
      return "border-primary bg-primary";
    case "current":
      return "border-primary bg-primary ring-4 ring-primary/20";
    case "cancelled":
      return "border-muted-foreground/40 bg-muted";
    default:
      return "border-border bg-background";
  }
}

function connectorClassName(complete: boolean, isCancelled: boolean) {
  if (isCancelled) return "bg-muted-foreground/25";
  return complete ? "bg-primary" : "bg-border";
}

export function OrderShipmentStatusStepper({
  shipmentStatus,
}: {
  shipmentStatus: number;
}) {
  const o = useTranslations().orders;
  const labels = shipmentProgressStepLabels(o);
  const isCancelled = shipmentStatus === OrderShipmentStatus.Cancelled;
  const activeIndex = shipmentProgressStepIndex(shipmentStatus);

  return (
    <div
      className="w-full"
      role="group"
      aria-label={`${o.shipmentStatusLabel}: ${shipmentStatusLabel(shipmentStatus, o)}`}
    >
      <div className="flex w-full items-start">
        {labels.map((label, stepIndex) => {
          const state = stepVisualState(stepIndex, activeIndex, isCancelled);
          const connectorComplete =
            !isCancelled && activeIndex >= 0 && stepIndex > 0 && activeIndex >= stepIndex;

          return (
            <Fragment key={label}>
              {stepIndex > 0 ? (
                <div
                  className="flex min-w-6 flex-1 items-center px-1 pt-[7px]"
                  aria-hidden
                >
                  <div
                    className={cn(
                      "h-0.5 w-full rounded-full transition-colors",
                      connectorClassName(connectorComplete, isCancelled),
                    )}
                  />
                </div>
              ) : null}
              <div
                className="flex w-[4.75rem] shrink-0 flex-col items-center sm:w-24"
                aria-current={state === "current" ? "step" : undefined}
              >
                <div
                  className={cn(
                    "size-3.5 shrink-0 rounded-full border-2 transition-colors",
                    dotClassName(state),
                  )}
                />
                <span
                  className={cn(
                    "mt-2 text-center text-[10px] leading-tight font-medium sm:text-xs",
                    state === "current" && "text-foreground",
                    state === "complete" && "text-muted-foreground",
                    state === "upcoming" && "text-muted-foreground/70",
                    state === "cancelled" && "text-muted-foreground/60",
                  )}
                >
                  {label}
                </span>
              </div>
            </Fragment>
          );
        })}
      </div>

      {isCancelled ? (
        <p className="mt-3 text-center text-sm font-medium text-red-700">
          {o.shipmentStatusCancelled}
        </p>
      ) : null}
    </div>
  );
}
