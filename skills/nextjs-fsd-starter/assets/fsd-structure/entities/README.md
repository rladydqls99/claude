# Entities Layer

Business domain entities. Can only import from `shared/`.

## Structure

```
entities/
└── <entity-name>/
    ├── index.ts      # Public API (barrel file)
    ├── api/          # API calls related to this entity
    ├── model/        # Types, validation schemas, default values
    ├── ui/           # Entity-related UI components
    ├── lib/          # Entity-specific utilities and hooks
    └── config/       # Entity configuration and constants
```

## Example

```
entities/
└── user/
    ├── index.ts
    ├── api/
    │   └── fetchUser.ts
    ├── model/
    │   ├── types.ts        # User types
    │   ├── schema.ts       # Zod validation schemas
    │   └── defaults.ts     # Default values
    ├── ui/
    │   ├── UserAvatar.tsx
    │   └── UserCard.tsx
    ├── lib/
    │   └── useUser.ts
    └── config/
        └── constants.ts
```

## Import Rules

- ✅ Can import from: `@shared`
- ❌ Cannot import from: other entities, features, widgets, views
