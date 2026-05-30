"use client";

import { Fragment } from "react";
import { useTranslations } from "@/contexts/locale-context";
import {
  shipmentProgressStepIndex,
  shipmentProgressStepLabels,
  shipmentStatusLabel,
} from "@/lib/order-status-labels";
import { getShipmentProgressStatuses } from "@/types/api/order";
import { cn } from "@/lib/utils";

type StepVisualState = "complete" | "current" | "upcoming";

function stepVisualState(stepIndex: number, activeIndex: number): StepVisualState {
  if (activeIndex < 0) return "upcoming";
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
    default:
      return "border-border bg-background";
  }
}

function connectorClassName(complete: boolean) {
  return complete ? "bg-primary" : "bg-border";
}

export function OrderShipmentStatusStepper({
  shipmentStatus,
  shippingMethod,
}: {
  shipmentStatus: number;
  shippingMethod: number;
}) {
  const o = useTranslations().orders;
  const steps = getShipmentProgressStatuses(shippingMethod);
  const labels = shipmentProgressStepLabels(shippingMethod, o);
  const activeIndex = shipmentProgressStepIndex(shipmentStatus, shippingMethod);

  return (
    <div
      className="w-full"
      role="group"
      aria-label={`${o.shipmentStatusLabel}: ${shipmentStatusLabel(shipmentStatus, o)}`}
    >
      <div className="flex w-full items-start">
        {labels.map((label, stepIndex) => {
          const state = stepVisualState(stepIndex, activeIndex);
          const connectorComplete =
            activeIndex >= 0 && stepIndex > 0 && activeIndex >= stepIndex;

          return (
            <Fragment key={steps[stepIndex]}>
              {stepIndex > 0 ? (
                <div
                  className="flex min-w-4 flex-1 items-center px-0.5 pt-[7px] sm:min-w-6 sm:px-1"
                  aria-hidden
                >
                  <div
                    className={cn(
                      "h-0.5 w-full rounded-full transition-colors",
                      connectorClassName(connectorComplete),
                    )}
                  />
                </div>
              ) : null}
              <div
                className="flex w-[3.25rem] shrink-0 flex-col items-center sm:w-[4.5rem] md:w-20"
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
                    "mt-2 text-center text-[9px] leading-tight font-medium sm:text-[10px] md:text-xs",
                    state === "current" && "text-foreground",
                    state === "complete" && "text-muted-foreground",
                    state === "upcoming" && "text-muted-foreground/70",
                  )}
                >
                  {label}
                </span>
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
