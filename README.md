# Aegora

OpenAPI-first DDD monorepo for the dual-path retail-banking action plane (help + protect). Baseline is the zero-apps codegen scaffold; package scope is **`@aegora/*`**.

Product docs: [PRODUCT.md](PRODUCT.md) · [USER_STORIES.md](USER_STORIES.md) · [WEBAPP.md](WEBAPP.md)

Canonical HTTP contracts live in `packages/openapi-core/src/` (one YAML per domain). Do not treat a root `openapi.yaml` as the source of truth.

## Layout

```
packages/openapi-core  →  packages/core  →  platform/services  →  platform/adapters  →  platform/api-server
         ↑ OpenAPI source of truth                              ports↑        impl↑              HTTP↑
platform/webapp  → generated clients + product UI
```

## Quick start

```bash
pnpm install
pnpm lint:openapi && pnpm bundle:openapi
pnpm codegen:paths
pnpm build
pnpm dev:api
# Health: curl http://127.0.0.1:4000/health
# Demo key: X-API-Key: ddd_demo_local_dev_key
pnpm --filter @aegora/webapp dev
```

`.codegen/` is required locally to run `zero-codegen`. **Never commit or push `.codegen` to GitHub.**

## Codegen rules (agents)

1. **New domain** → full multi-layer generate once (Mode A).
2. **YAML edit on existing domain** → regenerate **core only**, handwrite below (Mode B).
3. Keep envelopes (`{ data, meta }`), nested DI, and identity middleware intact.

See `.cursor/skills/` and `docs/CODEGEN.md`.
