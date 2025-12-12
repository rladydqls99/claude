"use client";

import { type ComponentProps } from "react";
import { cn } from "../lib/cn";
import { SIZE_CONFIG, type Size } from "../config/size";

type InputProps = Omit<ComponentProps<"input">, "size"> & {
  size?: Size;
};

const sizeStyles: Record<Size, string> = {
  xs: cn(SIZE_CONFIG.xs.height, SIZE_CONFIG.xs.px, SIZE_CONFIG.xs.text, "rounded-md"),
  sm: cn(SIZE_CONFIG.sm.height, SIZE_CONFIG.sm.px, SIZE_CONFIG.sm.text, "rounded-md"),
  md: cn(SIZE_CONFIG.md.height, SIZE_CONFIG.md.px, SIZE_CONFIG.md.text, "rounded-md"),
  lg: cn(SIZE_CONFIG.lg.height, SIZE_CONFIG.lg.px, SIZE_CONFIG.lg.text, "rounded-lg"),
  xl: cn(SIZE_CONFIG.xl.height, SIZE_CONFIG.xl.px, SIZE_CONFIG.xl.text, "rounded-lg"),
};

const Input = ({ className, size = "md", type = "text", ...props }: InputProps) => {
  return (
    <input
      type={type}
      className={cn(
        // Layout
        "flex w-full bg-transparent shadow-sm",
        // Border & Background
        "border border-input transition-colors",
        // Typography
        "file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground",
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

export default Input;
