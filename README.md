# GLA Abuja Mobile App

Official mobile application for **Guiding Light Assembly (GLA) Abuja**.

## Tech Stack

| Tool | Version |
|------|---------|
| React Native | 0.86 |
| Expo SDK | 57 |
| Expo Router | ~4.0 |
| React | 19.2 |
| TypeScript | ~6.0 |
| TanStack React Query | ^5 |
| Axios | ^1.20 |
| Expo Secure Store | ~14.2 |
| @expo/vector-icons | ^14.1 |

## Project Structure

```
app/            Expo Router screens (file-based routing)
  (tabs)/       Bottom tab screens
  event/        Event detail screen [id]
  sermon/       Sermon detail screen [id]
  register/     Event registration screen [eventId]
components/     Reusable UI components
  ui/           Primitives (Button, Card, Input, etc.)
  events/       Event-specific components
  sermons/      Sermon-specific components
  common/       Shared layout components
constants/      Colors, typography, spacing, app config
hooks/          TanStack Query hooks (useEvents, useSermons, useAuth)
services/       API layer (axios wrappers)
types/          TypeScript interfaces
utils/          Date helpers, validation, secure storage
assets/         Images, icons, fonts
```

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm start

# Run on a specific platform
npm run android
npm run ios
npm run web
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start Expo dev server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Auto-fix lint issues |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check Prettier formatting |
| `npm run typecheck` | TypeScript type-check (no emit) |

## Environment Variables

See `.env.example` for all supported environment variables. All `EXPO_PUBLIC_*` variables are inlined at build time and safe to reference in client code.

## Architecture Notes

- **Routing** — Expo Router v4 with `app/` directory. All navigation uses `expo-router` imports (no direct `@react-navigation/*` imports per SDK 56+ requirement).
- **Data fetching** — TanStack React Query v5. Query client is configured in `app/_layout.tsx`. Query key factories live alongside hooks in `hooks/`.
- **Auth** — JWT-based. Tokens are stored in Expo Secure Store. The axios interceptor in `services/api.ts` handles silent token refresh on 401.
- **Styling** — StyleSheet-based, no third-party styling library. All tokens (colors, spacing, typography) live in `constants/`.
