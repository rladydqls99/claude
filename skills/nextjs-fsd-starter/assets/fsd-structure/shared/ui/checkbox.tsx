"use client";

import { type ComponentProps } from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";
import { cn } from "../lib/cn";
import { type Size } from "../config/size";

type CheckboxProps = ComponentProps<typeof CheckboxPrimitive.Root> & {
  size?: Size;
};

const sizeStyles: Record<Size, { box: string; icon: string }> = {
  xs: { box: "h-3.5 w-3.5 rounded-[3px]", icon: "h-3 w-3" },
  sm: { box: "h-4 w-4 rounded", icon: "h-3.5 w-3.5" },
  md: { box: "h-5 w-5 rounded-md", icon: "h-4 w-4" },
  lg: { box: "h-6 w-6 rounded-md", icon: "h-5 w-5" },
  xl: { box: "h-7 w-7 rounded-lg", icon: "h-6 w-6" },
};

const Checkbox = ({ className, size = "md", ...props }: CheckboxProps) => {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        // Layout
        "peer shrink-0",
        // Border & Background
        "border border-input bg-background shadow-sm",
        // Focus
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        // Checked state
        "data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        "data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground",
        // Disabled
        "disabled:cursor-not-allowed disabled:opacity-50",
        // Invalid
        "aria-[invalid=true]:border-destructive",
        // Transitions
        "transition-all duration-200",
        // Size
        sizeStyles[size].box,
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current animate-in zoom-in-50 duration-200">
        {props.checked === "indeterminate" ? (
          <Minus className={sizeStyles[size].icon} strokeWidth={3} />
        ) : (
          <Check className={sizeStyles[size].icon} strokeWidth={3} />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
};

export default Checkbox;
