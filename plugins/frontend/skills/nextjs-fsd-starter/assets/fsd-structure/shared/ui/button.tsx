"use client";

import { type ComponentProps } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../lib/cn";
import { SIZE_CONFIG, type Size } from "../config/size";

type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";

type ButtonProps = ComponentProps<"button"> & {
  variant?: ButtonVariant;
  size?: Size;
  asChild?: boolean;
};

const variantStyles: Record<ButtonVariant, string> = {
  default: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 active:bg-primary/80",
  destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 active:bg-destructive/80",
  outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground active:bg-accent/80",
  secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/90 active:bg-secondary/80",
  ghost: "hover:bg-accent hover:text-accent-foreground active:bg-accent/80",
  link: "text-primary underline-offset-4 hover:underline",
};

const sizeStyles: Record<Size, string> = {
  xs: cn(SIZE_CONFIG.xs.height, SIZE_CONFIG.xs.px, SIZE_CONFIG.xs.text, "rounded-md"),
  sm: cn(SIZE_CONFIG.sm.height, SIZE_CONFIG.sm.px, SIZE_CONFIG.sm.text, "rounded-md"),
  md: cn(SIZE_CONFIG.md.height, SIZE_CONFIG.md.px, SIZE_CONFIG.md.text, "rounded-md"),
  lg: cn(SIZE_CONFIG.lg.height, SIZE_CONFIG.lg.px, SIZE_CONFIG.lg.text, "rounded-lg"),
  xl: cn(SIZE_CONFIG.xl.height, SIZE_CONFIG.xl.px, SIZE_CONFIG.xl.text, "rounded-lg"),
};

const Button = ({
  className,
  variant = "default",
  size = "md",
  asChild = false,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(
        // Layout
        "inline-flex items-center justify-center gap-2 cursor-pointer",
        // Typography
        "font-semibold whitespace-nowrap tracking-tight",
        // Focus
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
        // Transitions
        "transition-all duration-200 active:scale-95",
        // Disabled
        "disabled:pointer-events-none disabled:opacity-50",
        // Variants
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    />
  );
};

export default Button;
