"use client";

import { type ComponentProps } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "../lib/cn";

// Overlay
const DialogOverlay = ({ className, ...props }: ComponentProps<typeof DialogPrimitive.Overlay>) => {
  return (
    <DialogPrimitive.Overlay
      className={cn(
        // Layout
        "fixed inset-0 z-50",
        // Background
        "bg-black/40 backdrop-blur-sm",
        // Animation
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      {...props}
    />
  );
};

// Content
const DialogContent = ({
  className,
  children,
  ...props
}: ComponentProps<typeof DialogPrimitive.Content>) => {
  return (
    <DialogPrimitive.Portal>
      <DialogOverlay />
      <DialogPrimitive.Content
        className={cn(
          // Layout
          "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
          // Sizing
          "grid w-full max-w-lg gap-4 p-6",
          // Border & Background
          "rounded-xl border bg-background shadow-2xl",
          // Animation
          "duration-200",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
          "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
          className
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close
          className={cn(
            // Layout
            "absolute right-4 top-4",
            // Border & Background
            "rounded-full p-1 opacity-70 transition-opacity hover:opacity-100 hover:bg-secondary",
            // Focus
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            // Disabled
            "disabled:pointer-events-none",
            // Data state
            "data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          )}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
};

// Header
const DialogHeader = ({ className, ...props }: ComponentProps<"div">) => {
  return (
    <div
      className={cn("flex flex-col gap-1.5 text-center sm:text-left", className)}
      {...props}
    />
  );
};

// Footer
const DialogFooter = ({ className, ...props }: ComponentProps<"div">) => {
  return (
    <div
      className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
      {...props}
    />
  );
};

// Title
const DialogTitle = ({ className, ...props }: ComponentProps<typeof DialogPrimitive.Title>) => {
  return (
    <DialogPrimitive.Title
      className={cn("text-lg font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  );
};

// Description
const DialogDescription = ({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Description>) => {
  return (
    <DialogPrimitive.Description
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
};

// Compound Component
const Dialog = Object.assign(DialogPrimitive.Root, {
  Portal: DialogPrimitive.Portal,
  Overlay: DialogOverlay,
  Trigger: DialogPrimitive.Trigger,
  Close: DialogPrimitive.Close,
  Content: DialogContent,
  Header: DialogHeader,
  Footer: DialogFooter,
  Title: DialogTitle,
  Description: DialogDescription,
});

export default Dialog;
