import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier/recommended";
import importPlugin from "eslint-plugin-import";
import reactHooks from "eslint-plugin-react-hooks";
import reactCompiler from "eslint-plugin-react-compiler";
import nextPlugin from "@next/eslint-plugin-next";

const eslintConfig = tseslint.config(
  // Base configs
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,

  // Global ignores
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "dist/**",
      "build/**",
      "*.config.js",
      "*.config.mjs",
    ],
  },

  // React and Next.js
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
    ],
    plugins: {
      "react-hooks": reactHooks,
      "react-compiler": reactCompiler,
      "@next/next": nextPlugin,
    },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "react-compiler/react-compiler": "error",
      "prettier/prettier": "error",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          pathGroups: [
            { pattern: "@/**", group: "internal", position: "after" },
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
    },
  },

  // FSD Architecture Rules - Global public API enforcement
  {
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            // Enforce public API for shared (allow @shared, @shared/server)
            {
              group: ["@/shared/*/*", "@/shared/**/*"],
              message:
                "Use public API: import from '@shared' or '@shared/server' instead of internal modules",
            },
            // Enforce public API for entities
            {
              group: ["@/entities/*/*", "@/entities/**/*"],
              message:
                "Use public API: import from '@entities/<slice>' instead of internal modules",
            },
            // Enforce public API for features
            {
              group: ["@/features/*/*", "@/features/**/*"],
              message:
                "Use public API: import from '@features/<slice>' instead of internal modules",
            },
            // Enforce public API for widgets
            {
              group: ["@/widgets/*/*", "@/widgets/**/*"],
              message:
                "Use public API: import from '@widgets/<slice>' instead of internal modules",
            },
            // Enforce public API for views
            {
              group: ["@/views/*/*", "@/views/**/*"],
              message:
                "Use public API: import from '@views/<slice>' instead of internal modules",
            },
          ],
        },
      ],
    },
  },

  // Layer hierarchy: shared cannot import from upper layers
  {
    files: ["src/shared/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/entities/*", "@entities/*"],
              message: "shared layer cannot import from entities",
            },
            {
              group: ["@/features/*", "@features/*"],
              message: "shared layer cannot import from features",
            },
            {
              group: ["@/widgets/*", "@widgets/*"],
              message: "shared layer cannot import from widgets",
            },
            {
              group: ["@/views/*", "@views/*"],
              message: "shared layer cannot import from views",
            },
          ],
        },
      ],
    },
  },

  // Layer hierarchy: entities cannot import from upper layers
  {
    files: ["src/entities/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/features/*", "@features/*"],
              message: "entities layer cannot import from features",
            },
            {
              group: ["@/widgets/*", "@widgets/*"],
              message: "entities layer cannot import from widgets",
            },
            {
              group: ["@/views/*", "@views/*"],
              message: "entities layer cannot import from views",
            },
          ],
        },
      ],
    },
  },

  // Layer hierarchy: features cannot import from upper layers
  {
    files: ["src/features/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/widgets/*", "@widgets/*"],
              message: "features layer cannot import from widgets",
            },
            {
              group: ["@/views/*", "@views/*"],
              message: "features layer cannot import from views",
            },
          ],
        },
      ],
    },
  },

  // Layer hierarchy: widgets cannot import from views
  {
    files: ["src/widgets/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/views/*", "@views/*"],
              message: "widgets layer cannot import from views",
            },
          ],
        },
      ],
    },
  },
);

export default eslintConfig;
