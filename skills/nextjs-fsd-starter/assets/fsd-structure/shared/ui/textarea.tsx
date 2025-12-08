"use client";

import { type ComponentProps } from "react";
import { cn } from "../lib/cn";
import { SIZE_CONFIG, type Size } from "../config/size";

type TextareaProps = ComponentProps<"textarea"> & {
  size?: Size;
};

const sizeStyles: Record<Size, string> = {
  xs: cn(SIZE_CONFIG.xs.px, SIZE_CONFIG.xs.py, SIZE_CONFIG.xs.text),
  sm: cn(SIZE_CONFIG.sm.px, SIZE_CONFIG.sm.py, SIZE_CONFIG.sm.text),
  md: cn(SIZE_CONFIG.md.px, SIZE_CONFIG.md.py, SIZE_CONFIG.md.text),
  lg: cn(SIZE_CONFIG.lg.px, SIZE_CONFIG.lg.py, SIZE_CONFIG.lg.text),
  xl: cn(SIZE_CONFIG.xl.px, SIZE_CONFIG.xl.py, SIZE_CONFIG.xl.text),
};

const Textarea = ({ className, size = "md", ...props }: TextareaProps) => {
  return (
    <textarea
      className={cn(
        // Layout
        "flex min-h-20 w-full resize-none bg-transparent shadow-sm",
        // Border & Background
        "rounded-md border border-input focus:border-ring",
        // Typography
        "placeholder:text-muted-foreground",
        // Focus
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-ring",
        // Invalid state
        "aria-[invalid=true]:border-destructive aria-[invalid=true]:focus-visible:ring-destructive",
        // Disabled
        "disabled:cursor-not-allowed disabled:opacity-50",
        // Size
        sizeStyles[size],
        className
      )}
      {...props}
    />
  );
};

export default Textarea;
