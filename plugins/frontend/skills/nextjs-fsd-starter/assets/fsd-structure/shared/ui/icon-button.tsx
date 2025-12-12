"use client";

import { type ComponentProps } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../lib/cn";
import { type Size } from "../config/size";

type IconButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost";

type IconButtonProps = ComponentProps<"button"> & {
  variant?: IconButtonVariant;
  size?: Size;
  asChild?: boolean;
};

// Size configuration specifically for icon buttons (square aspect ratio)
const sizeStyles: Record<Size, string> = {
  xs: cn("h-7 w-7 text-xs rounded-md"),
  sm: cn("h-8 w-8 text-sm rounded-md"),
  md: cn("h-9 w-9 text-base rounded-md"),
  lg: cn("h-10 w-10 text-lg rounded-lg"),
  xl: cn("h-12 w-12 text-xl rounded-lg"),
};

const variantStyles: Record<IconButtonVariant, string> = {
  default: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 active:bg-primary/80",
  destructive:
    "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 active:bg-destructive/80",
  outline:
    "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground active:bg-accent/80",
  secondary:
    "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/90 active:bg-secondary/80",
  ghost: "hover:bg-accent hover:text-accent-foreground active:bg-accent/80",
};

const IconButton = ({
  className,
  variant = "ghost", // Default to ghost for icons usually
  size = "md",
  asChild = false,
  ...props
}: IconButtonProps) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(
        // Layout
        "inline-flex cursor-pointer items-center justify-center p-0",
        // Focus
        "focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none",
        // Transitions
        "transition-all duration-200 active:scale-95",
        // Disabled
        "disabled:pointer-events-none disabled:opacity-50",
        // Child SVG sizing
        "[&_svg]:h-[1.25em] [&_svg]:w-[1.25em] [&_svg]:shrink-0",
        // Variants
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    />
  );
};

export default IconButton;
