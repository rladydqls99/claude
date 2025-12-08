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
    │   ├── Header.tsx
    │   ├── Navigation.tsx
    │   └── UserMenu.tsx
    ├── lib/
    │   └── useNavigation.ts
    └── config/
        └── menuItems.ts
```

## Import Rules

- ✅ Can import from: `@features/*`, `@entities/*`, `@shared`
- ❌ Cannot import from: other widgets, views
