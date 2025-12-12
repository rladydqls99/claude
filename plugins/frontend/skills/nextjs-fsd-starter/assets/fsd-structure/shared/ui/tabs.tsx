"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { type ComponentProps } from "react";

import { cn } from "../lib/cn";

const TabsList = ({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.List>) => (
  <TabsPrimitive.List
    className={cn(
      "bg-muted/20 text-muted-foreground inline-flex items-center justify-center rounded-lg p-1",
      "data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
      className
    )}
    {...props}
  />
);

const TabsTrigger = ({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Trigger>) => (
  <TabsPrimitive.Trigger
    className={cn(
      "ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
      // State styles
      "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  />
);

const TabsContent = ({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Content>) => (
  <TabsPrimitive.Content
    className={cn(
      "ring-offset-background focus-visible:ring-ring mt-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
      "data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:zoom-in-95",
      className
    )}
    {...props}
  />
);

// High-end "Dior" style variation prompts:
// For a truly persistent "Dior" look, the user might want something cleaner than the default "pill" style.
// Let's ensure the default is versatile, but maybe add a variant if requested later.
// For now, the "pill" style is "modern" and cleanly separates contexts.
// A "line" style is also very common in high-end fashion sites.
// I will stick to a very clean, neutral implementation that fits "Dior" (minimalism).

const Tabs = Object.assign(TabsPrimitive.Root, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});

export default Tabs;
