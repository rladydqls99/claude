"use client";

import { type ComponentProps } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "../lib/cn";

// Content
const TooltipContent = ({
  className,
  sideOffset = 4,
  ...props
}: ComponentProps<typeof TooltipPrimitive.Content>) => {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        sideOffset={sideOffset}
        className={cn(
          // Layout
          "z-50 overflow-hidden px-3 py-1.5",
          // Border & Background
          "rounded-md bg-foreground text-background shadow-md", // Inverted for high contrast
          // Typography
          "text-xs font-medium",
          // Animation
          "animate-in fade-in-0 zoom-in-95 duration-200",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          "data-[side=bottom]:slide-in-from-top-2",
          "data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2",
          "data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      />
    </TooltipPrimitive.Portal>
  );
};

// Compound Component
const Tooltip = Object.assign(TooltipPrimitive.Root, {
  Provider: TooltipPrimitive.Provider,
  Trigger: TooltipPrimitive.Trigger,
  Content: TooltipContent,
});

export default Tooltip;
