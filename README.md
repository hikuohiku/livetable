## Environment Variables

This frontend application requires the following environment variables in `.env.local`:

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key
GOOGLE_CLIENT_ID=your-google-oauth-client-id
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
```

**Note**: This application now requires a separate API server running to function properly. The API server should be running on the URL specified in `NEXT_PUBLIC_API_BASE_URL`.
