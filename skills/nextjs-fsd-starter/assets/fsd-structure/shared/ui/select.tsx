"use client";

import { type ComponentProps, createContext, useContext } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "../lib/cn";
import { SIZE_CONFIG, type Size } from "../config/size";

// Context
type SelectContextValue = {
  size: Size;
};

const SelectContext = createContext<SelectContextValue>({ size: "md" });

const useSelectContext = () => useContext(SelectContext);

// Root
type SelectRootProps = ComponentProps<typeof SelectPrimitive.Root> & {
  size?: Size;
};

const SelectRoot = ({ size = "md", children, ...props }: SelectRootProps) => {
  return (
    <SelectContext.Provider value={{ size }}>
      <SelectPrimitive.Root {...props}>{children}</SelectPrimitive.Root>
    </SelectContext.Provider>
  );
};

// Trigger
type SelectTriggerProps = ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: Size;
};

const sizeStyles: Record<Size, string> = {
  xs: cn(SIZE_CONFIG.xs.height, SIZE_CONFIG.xs.px, SIZE_CONFIG.xs.text, "rounded-md"),
  sm: cn(SIZE_CONFIG.sm.height, SIZE_CONFIG.sm.px, SIZE_CONFIG.sm.text, "rounded-md"),
  md: cn(SIZE_CONFIG.md.height, SIZE_CONFIG.md.px, SIZE_CONFIG.md.text, "rounded-md"),
  lg: cn(SIZE_CONFIG.lg.height, SIZE_CONFIG.lg.px, SIZE_CONFIG.lg.text, "rounded-lg"),
  xl: cn(SIZE_CONFIG.xl.height, SIZE_CONFIG.xl.px, SIZE_CONFIG.xl.text, "rounded-lg"),
};

const SelectTrigger = ({ className, children, size: propSize, ...props }: SelectTriggerProps) => {
  const { size: contextSize } = useSelectContext();
  const size = propSize || contextSize;

  return (
    <SelectPrimitive.Trigger
      className={cn(
        // Layout
        "flex w-full items-center justify-between gap-2",
        // Border & Background
        "border border-input bg-background shadow-sm",
        // Typography
        "whitespace-nowrap font-medium transition-all duration-200",
        // Placeholder
        "[&>span]:line-clamp-1",
        // Focus
        "focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring",
        // Open state
        "data-[state=open]:border-ring",
        // Disabled
        "disabled:cursor-not-allowed disabled:opacity-50",
        // Invalid
        "aria-[invalid=true]:border-destructive",
        // Size
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="h-4 w-4 opacity-50 transition-transform duration-200 data-[state=open]:rotate-180" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
};

// Scroll Up Button
const SelectScrollUpButton = ({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.ScrollUpButton>) => {
  return (
    <SelectPrimitive.ScrollUpButton
      className={cn("flex cursor-default items-center justify-center py-1 bg-gradient-to-b from-popover to-transparent", className)}
      {...props}
    >
      <ChevronUp className="h-4 w-4 text-muted-foreground" />
    </SelectPrimitive.ScrollUpButton>
  );
};

// Scroll Down Button
const SelectScrollDownButton = ({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.ScrollDownButton>) => {
  return (
    <SelectPrimitive.ScrollDownButton
      className={cn("flex cursor-default items-center justify-center py-1 bg-gradient-to-t from-popover to-transparent", className)}
      {...props}
    >
      <ChevronDown className="h-4 w-4 text-muted-foreground" />
    </SelectPrimitive.ScrollDownButton>
  );
};

// Content
type SelectContentProps = ComponentProps<typeof SelectPrimitive.Content>;

const SelectContent = ({
  className,
  children,
  position = "popper",
  ...props
}: SelectContentProps) => {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        className={cn(
          // Layout
          "relative z-50 max-h-96 min-w-[8rem] overflow-hidden",
          // Border & Background
          "rounded-lg border bg-background text-popover-foreground shadow-xl",
          // Animation
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          // Position
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
};

// Label
const SelectLabel = ({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.Label>) => {
  return (
    <SelectPrimitive.Label
      className={cn("px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider", className)}
      {...props}
    />
  );
};

// Item
const itemSizeStyles: Record<Size, string> = {
  xs: "text-xs py-1 pl-8 pr-2",
  sm: "text-xs py-1.5 pl-8 pr-2",
  md: "text-sm py-1.5 pl-8 pr-2",
  lg: "text-base py-2 pl-8 pr-3",
  xl: "text-lg py-2.5 pl-8 pr-4",
};

const SelectItem = ({
  className,
  children,
  ...props
}: ComponentProps<typeof SelectPrimitive.Item>) => {
  const { size } = useSelectContext();

  return (
    <SelectPrimitive.Item
      className={cn(
        // Layout
        "relative flex w-full cursor-pointer select-none items-center",
        // Spacing
        "rounded-md",
        // Typography
        "outline-none",
        // Focus & Selected
        "focus:bg-accent focus:text-accent-foreground",
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
        // Disabled
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        // Size (from context)
        itemSizeStyles[size],
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="h-4 w-4" strokeWidth={2.5} />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
};

// Separator
const SelectSeparator = ({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.Separator>) => {
  return (
    <SelectPrimitive.Separator className={cn("-mx-1 my-1 h-px bg-muted", className)} {...props} />
  );
};

// Compound Component
const Select = Object.assign(SelectRoot, {
  Group: SelectPrimitive.Group,
  Value: SelectPrimitive.Value,
  Trigger: SelectTrigger,
  Content: SelectContent,
  Label: SelectLabel,
  Item: SelectItem,
  Separator: SelectSeparator,
  ScrollUpButton: SelectScrollUpButton,
  ScrollDownButton: SelectScrollDownButton,
});

export default Select;
