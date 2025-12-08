# Views Layer

Page-level components (replaces FSD "pages" layer to avoid confusion with Next.js pages).
Can import from `widgets/`, `features/`, `entities/`, and `shared/`.

## Structure

```
views/
└── <view-name>/
    ├── index.ts      # Public API (barrel file)
    ├── api/          # Page-specific API calls, server actions
    ├── model/        # Types, validation schemas, default values
    ├── ui/           # Page UI components
    ├── lib/          # Page-specific utilities and hooks
    └── config/       # Page configuration
```

## Example

```
views/
└── home/
    ├── index.ts
    ├── api/
    │   └── fetchHomeData.ts
    ├── model/
    │   └── types.ts
    ├── ui/
    │   ├── HomePage.tsx
    │   ├── HeroSection.tsx
    │   └── FeaturesSection.tsx
    ├── lib/
    │   └── useHomeData.ts
    └── config/
        └── sections.ts
```

## Usage with Next.js App Router

```typescript
// src/app/page.tsx
import { HomePage } from "@views/home";

export default function Page() {
  return <HomePage />;
}
```

## Import Rules

- ✅ Can import from: `@widgets/*`, `@features/*`, `@entities/*`, `@shared`
- ❌ Cannot import from: other views
