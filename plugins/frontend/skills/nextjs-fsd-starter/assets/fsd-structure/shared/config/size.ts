// Unified size tokens for consistent component sizing
// When stacked vertically, components with the same size should have matching heights

export const SIZE_CONFIG = {
  xs: {
    height: "h-7", // 28px
    px: "px-2",
    py: "py-1",
    text: "text-xs",
    iconSize: 14,
  },
  sm: {
    height: "h-8", // 32px
    px: "px-3",
    py: "py-1.5",
    text: "text-sm",
    iconSize: 16,
  },
  md: {
    height: "h-9", // 36px
    px: "px-4",
    py: "py-2",
    text: "text-sm",
    iconSize: 18,
  },
  lg: {
    height: "h-10", // 40px
    px: "px-5",
    py: "py-2.5",
    text: "text-base",
    iconSize: 20,
  },
  xl: {
    height: "h-12", // 48px
    px: "px-6",
    py: "py-3",
    text: "text-lg",
    iconSize: 24,
  },
} as const;

export type Size = keyof typeof SIZE_CONFIG;
