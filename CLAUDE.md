# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LiveTable is a Next.js frontend application that provides a timetable for YouTube live streams. This is part of a polyrepo architecture where the frontend communicates with a separate API server for data operations.

## Architecture

### Core Technologies
- **Frontend**: Next.js 14 with TypeScript, React, TailwindCSS, Material-UI
- **Authentication**: NextAuth.js with JWT strategy
- **HTTP Client**: Custom fetch-based API client
- **Development**: Storybook for component development, Deno for additional tooling

### Key Components Structure
```
app/                 # Next.js 13+ app directory
├── api/auth/       # NextAuth.js authentication endpoints (JWT mode)
├── layout.tsx      # Root layout with Background component
└── page.tsx        # Main application page (uses API clients)

components/         # React components
├── LiveCard.tsx    # Individual stream card component
├── LiveTable.tsx   # Main table displaying streams
├── Header.tsx      # Application header with user controls
└── ...

lib/                # Core infrastructure
├── apiClient.ts    # HTTP API client with auth headers
└── types/
    └── api.ts      # API response type definitions

services/api/       # API client services
├── userService.ts     # User-related API calls
├── channelService.ts  # Channel-related API calls
└── videoService.ts    # Video-related API calls

types/              # TypeScript type definitions
├── entities/       # Domain models (User, Channel, Video)
├── services/       # Service interfaces
└── next-auth.d.ts  # NextAuth session type extensions
```

## Development Commands

### Basic Development
```bash
npm run dev          # Start development server (requires API server running)
npm run build        # Build production application
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Storybook
```bash
npm run storybook        # Start Storybook development server
npm run build-storybook  # Build Storybook for production
```

## Environment Setup

**IMPORTANT**: This frontend application requires a separate API server to be running.

Required environment variables in `.env.local`:
- `NEXTAUTH_URL`: Frontend application URL (e.g., http://localhost:3000)
- `NEXTAUTH_SECRET`: NextAuth secret key for JWT signing
- `GOOGLE_CLIENT_ID`: Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret
- `NEXT_PUBLIC_API_BASE_URL`: API server URL (e.g., http://localhost:3001/api)

## Polyrepo Architecture

### Frontend Responsibilities
- User interface and component rendering
- Client-side routing and navigation
- Authentication token management via NextAuth
- HTTP API calls to backend services
- Static asset serving and optimization

### API Server Dependencies
The frontend expects the API server to implement the endpoints defined in the external API specification repository.

**API Specification**: https://github.com/hikuohiku/livetable-api-spec (separate repository)

Key endpoint categories:
- **User Management**: User lookup, Google OAuth data, subscriptions
- **Channel Management**: Channel information and bulk operations  
- **Video Management**: Live streams, upcoming videos, video details

Refer to the API specification repository for complete endpoint documentation, request/response schemas, and authentication requirements.

### Authentication Flow
1. User authenticates via Google OAuth through NextAuth
2. NextAuth creates JWT token with Google access token
3. Frontend API client attaches JWT Bearer token to all API requests
4. API server validates JWT and processes authenticated requests

## Key Development Patterns

- Use absolute imports with `@/` prefix for internal modules
- Components follow Material-UI patterns with Emotion styling
- All API calls go through centralized service classes in `services/api/`
- HTTP client handles authentication headers automatically
- TypeScript interfaces define clear contracts between frontend and API
- Error handling includes fallbacks for API unavailability

## Development Workflow

1. **Start API Server**: Ensure the API server is running on the configured URL
2. **Environment Setup**: Configure all required environment variables
3. **Frontend Development**: Run `npm run dev` to start the Next.js development server
4. **Component Development**: Use Storybook for isolated component development
5. **API Integration**: Use API client services for all backend communication

## Testing and Quality

- ESLint with Next.js config and additional plugins (prettier, unused-imports)
- Storybook for component testing and documentation
- Type safety enforced between frontend and API contracts