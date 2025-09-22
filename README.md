This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!


---

# API Documentation

## API Structure and Design Decisions

This project uses the Next.js App Router API routes under `/app/api/` for all backend endpoints. The main endpoints are:

- `POST /api/register` — Register a new user
- `POST /api/login` — Authenticate a user and set a secure cookie
- `POST /api/logout` — Log out the user by clearing the auth cookie
- `GET /api/profile` — Get the authenticated user's profile

All endpoints are designed to be stateless and RESTful, using JSON for request and response bodies. The Prisma ORM is used for database access.

## Authentication Flow and Security

- Authentication is handled using JWT tokens, which are signed and stored in an HTTP-only, Secure, SameSite=Lax cookie named `token`.
- On login, a valid token is set in the cookie. On logout, the cookie is cleared.
- All protected endpoints (like `/api/profile`) check for the presence and validity of the `token` cookie. If the cookie is missing or invalid, a 401 Unauthorized response is returned.
- No sensitive data (like passwords) is ever returned in API responses.

## Error Handling

- All endpoints return JSON responses with appropriate HTTP status codes.
- Validation errors (e.g., invalid input data) return a 400 status with error details.
- Authentication errors (e.g., missing or invalid token) return a 401 status.
- Not found errors (e.g., user not found) return a 404 status.
- All other server errors return a 500 status with a generic error message.

Example error response:

```json
{
	"error": "Invalid credentials"
}
```

## Scalability Suggestions

- **Database Scaling:** Move from SQLite (if used) to a managed PostgreSQL or MySQL instance for production.
- **Token Blacklisting:** For advanced security, implement token blacklisting or short-lived tokens with refresh tokens.
- **Rate Limiting:** Add rate limiting to prevent brute-force attacks on authentication endpoints.
- **API Versioning:** Introduce versioned API routes (e.g., `/api/v1/`) for future changes.
- **Service Separation:** Split authentication and user management into separate microservices if the user base grows.
- **Monitoring:** Add logging and monitoring for API usage and error tracking.

---
