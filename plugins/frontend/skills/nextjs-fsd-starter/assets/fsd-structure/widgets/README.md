# Widgets Layer

Complex composite UI blocks. Can import from `features/`, `entities/`, and `shared/`.

## Structure

```
widgets/
└── <widget-name>/
    ├── index.ts      # Public API (barrel file)
    ├── api/          # Widget-related API calls (if needed)
    ├── model/        # Types, validation schemas, default values
    ├── ui/           # Widget UI components
    ├── lib/          # Widget-specific utilities and hooks
    └── config/       # Widget configuration
```

## Example

```
widgets/
└── header/
    ├── index.ts
    ├── model/
    │   └── types.ts
    ├── ui/
    │   ├── header.tsx
    │   ├── navigation.tsx
    │   └── user-menu.tsx
    ├── lib/
    │   └── use-navigation.ts
    └── config/
        └── menu-items.ts
```

## Import Rules

- ✅ Can import from: `@features/*`, `@entities/*`, `@shared`
- ❌ Cannot import from: other widgets, views
