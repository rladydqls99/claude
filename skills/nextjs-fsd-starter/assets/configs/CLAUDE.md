# Project Guidelines

## Architecture: Feature-Sliced Design (FSD)

This project follows FSD architecture with the following layer hierarchy:

```
src/
├── app/          # Next.js App Router (routing only)
├── views/        # Page-level components (replaces FSD "pages")
├── widgets/      # Complex composite UI blocks
├── features/     # User interaction features
├── entities/     # Business domain entities
└── shared/       # Reusable utilities, UI, types
```

## Import Rules (STRICT)

Layers can only import from layers below them:

| Layer | Can Import From |
|-------|-----------------|
| `views/` | widgets, features, entities, shared |
| `widgets/` | features, entities, shared |
| `features/` | entities, shared |
| `entities/` | shared |
| `shared/` | nothing (except external packages) |

**Cross-slice imports are forbidden.** Features cannot import from other features directly.

## Barrel File Convention

- `shared/index.ts` - Main barrel (client-safe exports)
- `shared/server.ts` - Server-only exports
- Other layers: `<layer>/<slice>/index.ts`

Example:
```typescript
// ✅ Correct
import { Button } from "@shared";
import { useAuth } from "@features/auth";

// ❌ Wrong - importing from slice internals
import { Button } from "@/shared/ui/button";
import { authStore } from "@/features/auth/model/store";
```

## Path Aliases

```
@/*           → src/*
@shared       → src/shared
@shared/server → src/shared/server
@entities/*   → src/entities/*
@features/*   → src/features/*
@widgets/*    → src/widgets/*
@views/*      → src/views/*
```

## Slice Internal Structure

Each slice (feature, entity, widget, view) follows this structure:

```
<slice-name>/
├── index.ts      # Public API (barrel file)
├── api/          # API calls, server actions
├── model/        # Types, validation schemas, default values
├── ui/           # React components
├── lib/          # Utilities, custom hooks
└── config/       # Slice-specific configuration
```

### Directory Purposes

| Directory | Purpose | Examples |
|-----------|---------|----------|
| `api/` | API calls, server actions | `fetchUser.ts`, `actions.ts` |
| `model/` | Types, validation, defaults | `types.ts`, `schema.ts`, `defaults.ts` |
| `ui/` | React components | `UserCard.tsx`, `UserList.tsx` |
| `lib/` | Utilities, custom hooks | `useUserStatus.ts`, `formatName.ts` |
| `config/` | Slice configuration | `constants.ts`, `settings.ts` |

## Code Style

### Function Declaration

**Always use arrow functions** for all function declarations:

```typescript
// ✅ Correct - Arrow functions
const fetchUsers = async () => {
  // ...
};

const formatDate = (date: Date) => {
  // ...
};

const useCustomHook = () => {
  // ...
};

// ❌ Wrong - Function declarations
function fetchUsers() {
  // ...
}
```

### Export Convention

**Naming Convention:**
- Use **kebab-case** for all file names (e.g., `user-card.tsx`, `use-auth.ts`).

**Components use default export, everything else uses named export:**

```typescript
// ✅ Component files (e.g., Button.tsx)
const Button = ({ children, ...props }: ButtonProps) => {
  return <button {...props}>{children}</button>;
};

export default Button;

// ✅ Utility/Hook files (e.g., useAuth.ts)
export const useAuth = () => {
  // ...
};

export const formatUser = (user: User) => {
  // ...
};

// ✅ Type files (e.g., types.ts)
export type User = {
  id: string;
  name: string;
};

export interface AuthState {
  isAuthenticated: boolean;
}
```

### Barrel File Export Pattern

```typescript
// ✅ index.ts - Re-export with named exports
export { default as Button } from "./ui/Button";
export { default as Input } from "./ui/Input";
export { default as Select } from "./ui/Select"; // Compound component
export * from "./lib/cn";
export * from "./model/types";
```

### Compound Component Pattern

For components with multiple related parts (Select, Dialog, Popover, Tooltip), use the compound pattern:

```typescript
// ✅ Compound Component (e.g., Select.tsx)
import * as SelectPrimitive from "@radix-ui/react-select";

const SelectTrigger = ({ ... }) => { ... };
const SelectContent = ({ ... }) => { ... };
const SelectItem = ({ ... }) => { ... };

// Attach sub-components to main component
const Select = Object.assign(SelectPrimitive.Root, {
  Trigger: SelectTrigger,
  Content: SelectContent,
  Item: SelectItem,
  Value: SelectPrimitive.Value,
});

export default Select;

// ✅ Usage
<Select>
  <Select.Trigger>
    <Select.Value placeholder="Select..." />
  </Select.Trigger>
  <Select.Content>
    <Select.Item value="1">Option 1</Select.Item>
  </Select.Content>
</Select>
```

### Size Props Convention

**For elements with native `size` attribute (input, select, etc.), use `Omit` to remove the native attribute:**

```typescript
// ✅ Correct - Use Omit to remove native size, then add custom size
type InputProps = Omit<ComponentProps<"input">, "size"> & {
  size?: Size;  // Custom size prop (xs, sm, md, lg, xl)
};

// Usage - all components use unified "size" prop
<Button size="md">Click me</Button>
<Input size="md" placeholder="Enter text" />
<Select.Trigger size="md">
  <Select.Value placeholder="Select..." />
</Select.Trigger>
<Badge size="md">Badge</Badge>
<Checkbox size="md" />
```

### Component Props Pattern

Use `ComponentProps` to extend native HTML element props:

```typescript
import { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button"> & {
  variant?: "primary" | "secondary";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
};

// React 19+ - No forwardRef needed
const Button = ({ variant = "primary", size = "md", className, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...props}
    />
  );
};

export default Button;
```

### CSS Class Organization with cn()

Group related Tailwind classes together using `cn()`:

```typescript
import { cn } from "@shared";

const Button = ({ className, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        // Layout
        "inline-flex items-center justify-center",
        // Sizing
        "h-10 px-4 py-2",
        // Typography
        "text-sm font-medium",
        // Colors
        "bg-primary text-primary-foreground",
        // States
        "hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2",
        // Transitions
        "transition-colors duration-200",
        // Disabled
        "disabled:pointer-events-none disabled:opacity-50",
        // Custom
        className
      )}
      {...props}
    />
  );
};
```

### Radix UI Data Attributes

Use Radix data attributes for styling state:

```typescript
// ✅ Use data attributes for state styling
className={cn(
  "data-[state=open]:bg-accent",
  "data-[state=checked]:bg-primary",
  "data-[disabled]:opacity-50",
  "data-[highlighted]:bg-accent"
)}
```

### Form Component Guidelines

For form-related components (Input, Select, Checkbox, etc.):

1. Support `disabled` state with visual feedback
2. Support validation states (`aria-invalid`, `data-invalid`)
3. Include proper ARIA attributes
4. Handle focus states appropriately

```typescript
const Input = ({ className, ...props }: InputProps) => {
  return (
    <input
      className={cn(
        // Base styles
        "flex w-full rounded-md border bg-background px-3 py-2",
        // Focus
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        // Invalid state
        "aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive",
        // Disabled
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
};
```

## TypeScript

- Use TypeScript strict mode
- Prefer `type` over `interface` for object types (unless extending)
- Use explicit return types for public APIs
- Use `"use client"` directive only when necessary
- Server components by default (Next.js 15+)

## React Compiler

This project uses React Compiler for automatic memoization. Key points:

- **No manual `useMemo`, `useCallback`, `React.memo` needed** - the compiler handles optimization automatically
- **Follow Rules of React** - the compiler enforces React's rules strictly
- **ESLint plugin** - `eslint-plugin-react-compiler` will warn about violations

```typescript
// ✅ React Compiler handles this automatically
const Component = ({ items }: Props) => {
  const filtered = items.filter((item) => item.active);
  const sorted = filtered.sort((a, b) => a.name.localeCompare(b.name));

  return <List items={sorted} />;
};

// ❌ Not needed with React Compiler
const Component = ({ items }: Props) => {
  const filtered = useMemo(() => items.filter((item) => item.active), [items]);
  const handleClick = useCallback(() => { ... }, []);

  return <List items={filtered} onClick={handleClick} />;
};
```

## Commands

```bash
pnpm dev          # Start development server
pnpm build        # Production build
pnpm lint         # Run ESLint
pnpm lint:fix     # Fix ESLint errors
pnpm format       # Format with Prettier
pnpm format:check # Check formatting
```
