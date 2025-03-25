# Next.js + Cloudflare Workers SaaS Template Project Plan

## Tech Stack Overview

### Frontend
- Next.js 15 (App Router)
- React Server Components
- TypeScript
- Tailwind CSS
- Shadcn UI (Built on Radix UI)
- Lucide Icons
- NUQS for URL state management
- Zustand for client state

### Backend (Cloudflare Workers with OpenNext)
- DrizzleORM
- Cloudflare D1 (SQLite Database)
- Cloudflare KV (Session/Cache Storage)
- Cloudflare R2 (File Storage)
- OpenNext for SSR/Edge deployment

### Authentication & Authorization
- Lucia Auth (User Management)
- KV-based session management
- CUID2 for ID generation

## Project Structure

```
├── src/                          # Source directory
│   ├── app/                      # Next.js App Router
│   │   ├── (auth)/               # Auth-related routes
│   │   │   ├── sign-in/          # Sign in functionality
│   │   │   ├── sign-up/          # Sign up functionality
│   │   │   ├── forgot-password/  # Password reset request
│   │   │   └── reset-password/   # Password reset completion
│   │   ├── (dashboard)/          # Dashboard and app features
│   │   ├── (legal)/              # Legal pages (terms, privacy)
│   │   ├── (marketing)/          # Landing pages and marketing
│   │   ├── (settings)/           # User settings pages
│   │   │   └── settings/
│   │   │       ├── profile/      # Profile settings
│   │   │       └── sessions/     # Session management
│   │   ├── api/                  # API routes
│   │   └── globals.css           # Global styles
│   ├── components/               # React components
│   │   ├── auth/                 # Authentication components
│   │   ├── layout/               # Layout components
│   │   └── ui/                   # Shadcn UI components
│   ├── db/                       # Database related code
│   │   ├── migrations/           # Database migrations
│   │   └── schema.ts             # DrizzleORM schema
│   ├── react-email/              # Email templates with react-email
│   │   ├── reset-password.tsx
│   │   └── verify-email.tsx
│   ├── schemas/                  # Zod validation schemas
│   ├── state/                    # Client state management (Zustand)
│   │   └── session.ts            # Session state store
│   └── utils/                    # Core utilities
│       ├── auth.ts               # Authentication logic
│       ├── email.tsx             # Email sending utilities
│       └── kv-session.ts         # Session handling with KV
├── public/                       # Static assets
├── cursor-docs/                  # Project documentation
└── .wrangler/                    # Cloudflare Workers config
```

## Development Phases

### Phase 1: Setup & Infrastructure ✅
- [x] Initialize Next.js project with TypeScript
- [x] Configure Cloudflare Workers
- [x] Set up D1 database with DrizzleORM
  - [x] Implemented user table
  - [x] Added common columns (id, createdAt, updatedAt)
  - [x] Set up CUID2 for ID generation
- [x] Implement authentication with Lucia Auth
  - [x] Basic sign-up page structure created
  - [x] Password hashing implementation
  - [x] Set up KV for session storage
  - [x] Sign-in functionality
  - [x] Sign-up functionality
  - [x] Session management with KV storage
  - [x] Protected routes and layouts
- [x] Configure development environment
  - [x] Development workflow with wrangler
  - [x] Local database setup
- [x] Set up CI/CD pipeline
  - [x] GitHub Actions workflow
  - [x] Cloudflare deployment
  - [x] Environment secrets management

### Phase 2: Core Features (In Progress)
- [x] User management system
  - [x] User profile settings page
  - [x] Profile information update
  - [x] Session management with KV
  - [x] Protected routes and layouts
  - [x] Settings form with validation
  - [x] Session listing and management
- [x] Dashboard layout
  - [x] Navigation component
  - [x] Protected layout structure
  - [x] Responsive design
  - [x] Dark mode support
- [ ] Basic CRUD operations
  - [x] User profile updates
  - [x] Session management
  - [ ] Resource management
- [x] API routes implementation
  - [x] Authentication endpoints
  - [x] User profile endpoints
  - [x] Settings update endpoints
  - [x] Session management endpoints
- [x] Database schema design
  - [x] User table schema
  - [x] Session management
  - [ ] Resource tables
- [ ] File upload system with R2

### Phase 3: User Experience & Security
- [x] Password reset flow
  - [x] Forgot password functionality
  - [x] Email verification
  - [x] Password change in settings
- [x] Email system
  - [x] Email templates
  - [x] Transactional emails
  - [x] Email verification
- [x] Security enhancements
  - [x] Rate limiting
  - [x] Input sanitization
  - [x] Security headers

### Phase 4: Billing & Subscriptions
- [x] Credit-based billing
- [x] Credit packages and pricing
- [x] Credit usage tracking
- [x] Transaction history
- [x] Monthly credit refresh
- [x] Stripe payment processing

### Phase 5: Advanced Features
- [ ] Real-time updates
- [ ] Analytics dashboard
- [ ] Team collaboration features
- [ ] API rate limiting
- [ ] Audit logging

### Phase 6: Polish & Launch
- [ ] Performance optimization
- [ ] Security hardening
- [ ] Documentation
- [ ] Testing
- [ ] Production deployment

## Key Features

### User Management
- [x] Authentication (Lucia Auth)
- [x] User profiles and settings
- [x] Session management
- [ ] Team management
- [ ] Role-based access control

### Core Application
- [x] Dashboard layout
- [ ] Resource management
- [ ] File uploads
- [ ] API access
- [ ] Component marketplace with credit system

### Billing & Subscriptions
- [x] Credit-based billing
- [x] Credit packages and pricing
- [x] Credit usage tracking
- [x] Transaction history
- [x] Monthly credit refresh
- [x] Stripe payment processing

### Developer Experience
- [ ] API documentation
- [ ] SDK/API clients
- [ ] Webhooks
- [x] Rate limiting

## Technical Considerations

### Performance
- [x] Edge computing with Cloudflare Workers
- [x] React Server Components
- [x] Efficient data fetching
- [x] Asset optimization
- [x] Edge caching strategy
- [x] Suspense for async operations to improve initial page load

### Credit Billing System
- [x] Credit-based Pricing Model
  - [x] Flexible credit packages with different tiers
  - [x] Monthly credit allocation and refresh
  - [x] Pay-as-you-go pricing structure
  - [x] Credit expiration management
- [x] Transaction Management
  - [x] Secure payment processing with Stripe
  - [x] Detailed transaction history
  - [x] Credit usage tracking per feature
  - [x] Automated billing notifications
- [x] Credit Usage System
  - [x] Real-time credit balance tracking
  - [x] Usage analytics and reporting
  - [x] Credit deduction for feature usage
  - [x] Low credit balance alerts
- [x] Admin Controls
  - [x] Credit package management
  - [x] Manual credit adjustments
  - [x] Usage monitoring tools
  - [x] Billing dispute handling

### Security
- [x] Authentication & authorization
- [x] Session management
- [ ] Data encryption
- [x] Rate limiting
- [ ] CORS policies
- [x] Input validation

### Scalability
- [x] Serverless architecture
- [x] Edge caching
- [ ] Database optimization
- [ ] Asset delivery via R2

## Monitoring & Analytics
- [ ] Error tracking
- [ ] Performance monitoring
- [ ] User analytics
- [ ] Credit usage metrics
- [ ] Transaction monitoring
- [ ] Usage metrics

## Launch Checklist
- [ ] Security audit
- [ ] Performance testing
- [ ] Documentation review
- [ ] Legal compliance
- [ ] Marketing materials
- [ ] Support system
- [ ] Backup procedures

## Future Enhancements
- [ ] AI features integration
- [ ] Advanced analytics
- [ ] Mobile application
- [ ] Additional integrations
- [ ] Extended API capabilities

## Development Guidelines

### Code Style
- Functional components with TypeScript
- Server Components by default, 'use client' only when needed
- Modular file structure with clear separation of concerns
- Form validation with Zod schemas
- State management:
  - Server state with React Server Components
  - Client state with Zustand where needed
  - URL state with NUQS
- Cloudflare bindings accessed through getCloudflareContext

### Testing Strategy
- Unit tests (Vitest)
- Integration tests
- E2E tests (Playwright)
- Performance testing

### Documentation
- API documentation
- User guides
- Developer documentation
- Architecture diagrams

### Database Schema
Current Implementation:
- User table with:
  - CUID2 based IDs
  - Timestamps (created/updated)
  - Basic user fields (firstName, lastName, email)
  - Password hash storage
  - Authentication provider fields
  - Settings fields with validation
  - Profile information fields
  - Email verification status
- Session storage in KV with:
  - User relationship
  - Expiration tracking
  - Secure session management
  - Auto-cleanup via KV TTL
  - Rate limiting data
- Authentication features:
  - Email/password authentication
  - Session-based auth with KV storage
  - Secure password hashing
  - Sign-in/Sign-up flows
  - User settings management with validation
  - Email verification flow
  - Rate limiting for auth endpoints
- Credit and transaction tables
- Resource tables

### Project Structure Updates
- [x] Added (protected) layout for authenticated routes
- [x] Implemented settings page with profile management
- [x] Added session state management with Zustand
- [x] Implemented server-side session validation
- [x] Added form validation with Zod schemas
- [x] Added settings form with real-time validation
- [x] Implemented navigation component with responsive design
- [x] Integrated Shadcn UI components for forms and layouts
- [x] Added dark mode support
- [x] Implemented session listing and management
- [x] Added password reset flow with email verification
- [x] Implemented React Email templates for transactional emails
- [x] Added forgot password functionality with secure token handling

This plan will be regularly updated as the project progresses.
