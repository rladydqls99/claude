# Features Layer

User interaction features. Can import from `entities/` and `shared/`.

## Structure

```
features/
└── <feature-name>/
    ├── index.ts      # Public API (barrel file)
    ├── api/          # Feature-related API calls, server actions
    ├── model/        # Types, validation schemas, default values
    ├── ui/           # Feature UI components
    ├── lib/          # Feature-specific utilities and hooks
    └── config/       # Feature configuration and settings
```

## Example

```
features/
└── auth/
    ├── index.ts
    ├── api/
    │   ├── login.ts
    │   └── logout.ts
    ├── model/
    │   ├── types.ts        # Auth types
    │   ├── schema.ts       # Login form validation
    │   └── defaults.ts     # Default form values
    ├── ui/
    │   ├── login-form.tsx
    │   └── logout-button.tsx
    ├── lib/
    │   ├── use-auth.ts
    │   └── auth-guard.ts
    └── config/
        └── settings.ts
```

## Import Rules

- ✅ Can import from: `@entities/*`, `@shared`
- ❌ Cannot import from: other features, widgets, views
