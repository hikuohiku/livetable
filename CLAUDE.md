# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LiveTable is a Next.js application that provides a timetable for YouTube live streams. Users can authenticate with Google OAuth, subscribe to YouTube channels, and track upcoming/live streams with scheduling notifications.

## Architecture

### Core Technologies
- **Frontend**: Next.js 14 with TypeScript, React, TailwindCSS, Material-UI
- **Backend**: Next.js API routes with NextAuth.js for authentication
- **Database**: MySQL with Prisma ORM
- **External APIs**: YouTube Data API v3, YouTube RSS feeds
- **Development**: Storybook for component development, Deno for additional tooling

### Key Components Structure
```
app/                 # Next.js 13+ app directory
├── api/auth/       # NextAuth.js authentication endpoints
├── layout.tsx      # Root layout with Background component
└── page.tsx        # Main application page

components/         # React components
├── LiveCard.tsx    # Individual stream card component
├── LiveTable.tsx   # Main table displaying streams
├── Header.tsx      # Application header with user controls
└── ...

services/           # Business logic layer
├── youtubeService.ts         # Main YouTube service facade
├── youtubeApiService.ts      # YouTube Data API integration
├── youtubeRssService.ts      # RSS feed parsing
└── repositories/             # Data access layer

types/              # TypeScript type definitions
├── entities/       # Domain models (User, Channel, Video)
└── services/       # Service interfaces
```

### Database Schema
The application uses Prisma with MySQL and includes these main entities:
- **User**: OAuth users with Google integration
- **Channel**: YouTube channels with metadata
- **Video**: YouTube videos/streams with scheduling info
- **Subscription**: User-channel relationships
- **UserSchedule**: User notification preferences for specific videos

## Development Commands

### Basic Development
```bash
npm run dev          # Start development server
npm run build        # Build production application (includes Prisma generate)
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Database Operations
```bash
# Database migrations (using dotenv for .env.local)
npm run migrate      # Deploy migrations to database
./node_modules/.bin/dotenv -e .env.local -- yarn prisma migrate dev --name <migration-name>  # Create new migration

# Generate Prisma client (automatically run during build)
npx prisma generate
```

### Storybook
```bash
npm run storybook        # Start Storybook development server
npm run build-storybook  # Build Storybook for production
```

## Environment Setup

The application requires these environment variables in `.env.local`:
- `DATABASE_URL`: MySQL connection string
- `NEXTAUTH_URL`: Application URL for NextAuth
- `NEXTAUTH_SECRET`: NextAuth secret key
- `GOOGLE_CLIENT_ID`: Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret
- `YOUTUBE_API_KEY`: YouTube Data API key

## Service Layer Architecture

The application follows a service-oriented architecture:

1. **YoutubeService**: Main facade combining RSS and API data
2. **youtubeRssService**: Fetches basic stream data from YouTube RSS
3. **youtubeApiService**: Enriches data with detailed information from YouTube API
4. **Repositories**: Handle database operations for each entity type

## Key Development Patterns

- Use absolute imports with `@/` prefix for internal modules
- Components follow Material-UI patterns with Emotion styling
- Database queries use Prisma Client with proper error handling
- All external API calls are centralized in service classes
- TypeScript interfaces define clear contracts between layers

## Testing and Quality

- ESLint with Next.js config and additional plugins (prettier, unused-imports)
- Storybook for component testing and documentation
- Prisma migrations for database schema versioning