"use client";

import { useState, type ComponentProps } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "../lib/cn";
import { SIZE_CONFIG, type Size } from "../config/size";

type PasswordInputProps = Omit<ComponentProps<"input">, "size" | "type"> & {
  size?: Size;
};

const sizeStyles: Record<Size, string> = {
  xs: cn(SIZE_CONFIG.xs.height, SIZE_CONFIG.xs.px, SIZE_CONFIG.xs.text, "rounded-md"),
  sm: cn(SIZE_CONFIG.sm.height, SIZE_CONFIG.sm.px, SIZE_CONFIG.sm.text, "rounded-md"),
  md: cn(SIZE_CONFIG.md.height, SIZE_CONFIG.md.px, SIZE_CONFIG.md.text, "rounded-md"),
  lg: cn(SIZE_CONFIG.lg.height, SIZE_CONFIG.lg.px, SIZE_CONFIG.lg.text, "rounded-lg"),
  xl: cn(SIZE_CONFIG.xl.height, SIZE_CONFIG.xl.px, SIZE_CONFIG.xl.text, "rounded-lg"),
};

const PasswordInput = ({ className, size = "md", ...props }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => setShowPassword(!showPassword);

  return (
    <div className={cn("relative flex w-full", className)}>
      <input
        type={showPassword ? "text" : "password"}
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
          "pr-10" // Space for the icon
        )}
        {...props}
      />
      <button
        type="button"
        onClick={toggleVisibility}
        className={cn(
          "absolute right-0 top-0 flex h-full items-center justify-center px-3 text-muted-foreground hover:text-foreground transition-colors focus:outline-none disabled:opacity-50",
          props.disabled && "pointer-events-none"
        )}
        disabled={props.disabled}
        tabIndex={-1}
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
        <span className="sr-only">
          {showPassword ? "Hide password" : "Show password"}
        </span>
      </button>
    </div>
  );
};

export default PasswordInput;
