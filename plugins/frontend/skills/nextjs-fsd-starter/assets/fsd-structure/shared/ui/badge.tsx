"use client";

import { type ComponentProps } from "react";
import { cn } from "../lib/cn";
import { SIZE_CONFIG, type Size } from "../config/size";

type BadgeVariant =
  | "default"
  | "secondary"
  | "destructive"
  | "outline"
  | "success"
  | "warning"
  | "info"
  | "purple"
  | "pink"
  | "orange"
  | "cyan"
  | "lime";

type BadgeProps = ComponentProps<"span"> & {
  variant?: BadgeVariant;
  size?: Size;
};

const variantStyles: Record<BadgeVariant, string> = {
  default: "border-transparent bg-primary text-primary-foreground shadow-sm hover:bg-primary/95",
  secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/90",
  destructive: "border-transparent bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/95",
  outline: "border-border bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground",
  success: "border-transparent bg-green-500/15 text-green-700 dark:text-green-400 hover:bg-green-500/25",
  warning: "border-transparent bg-yellow-500/15 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-500/25",
  info: "border-transparent bg-blue-500/15 text-blue-700 dark:text-blue-400 hover:bg-blue-500/25",
  purple: "border-transparent bg-purple-500/15 text-purple-700 dark:text-purple-400 hover:bg-purple-500/25",
  pink: "border-transparent bg-pink-500/15 text-pink-700 dark:text-pink-400 hover:bg-pink-500/25",
  orange: "border-transparent bg-orange-500/15 text-orange-700 dark:text-orange-400 hover:bg-orange-500/25",
  cyan: "border-transparent bg-cyan-500/15 text-cyan-700 dark:text-cyan-400 hover:bg-cyan-500/25",
  lime: "border-transparent bg-lime-500/15 text-lime-700 dark:text-lime-400 hover:bg-lime-500/25",
};

const sizeStyles: Record<Size, string> = {
  xs: cn(SIZE_CONFIG.xs.px, SIZE_CONFIG.xs.py, "text-[10px] h-5"),
  sm: cn(SIZE_CONFIG.sm.px, "py-0.5", "text-xs h-6"),
  md: cn(SIZE_CONFIG.md.px, "py-1", "text-sm h-7"),
  lg: cn(SIZE_CONFIG.lg.px, "py-1.5", "text-base h-8"),
  xl: cn(SIZE_CONFIG.xl.px, "py-2", "text-lg h-9"),
};

const Badge = ({ className, variant = "default", size = "sm", ...props }: BadgeProps) => {
  return (
    <span
      className={cn(
        // Layout
        "inline-flex items-center justify-center",
        // Border
        "rounded-full border",
        // Typography
        "font-semibold whitespace-nowrap transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        // Variants
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    />
  );
};

export default Badge;
