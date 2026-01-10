# Businessstylist - Next.js Application

Professional Business Style Consulting Platform mit Kibbe-Typenanalyse built with Next.js, TypeScript, Prisma, and Stripe.

## Features

### ✅ Vollständig implementiert:
- 🎨 **Professional Design System** - Tailwind mit Business-Farbpalette und Brand Tokens
- 🔐 **Authentication** - NextAuth mit Rollen (USER/ADMIN)
- 📊 **Kibbe Typenanalyse** - 19-Fragen Multi-Step Quiz mit Scoring-Logik
- 🎯 **Leadmagnet-Flow** - Automatische User-Anlage, E-Mail mit Passwort
- 💎 **Upsell-Mechanik** - Lookbook-Empfehlung basierend auf Kibbe-Typ
- 📚 **Lookbook Management** - Kibbe-Typ-Zuordnung, User-Assignment
- 🛍️ **E-Commerce** - Stripe integration (vorbereitet)
- 💳 **Payment Processing** - Checkout & Webhook Struktur
- 📱 **Mobile-First** - Responsive Design, optimiert für Touch
- ⚡ **SEO-Optimized** - SSR/SSG, Metadata API, Sitemap, Robots.txt, llms.txt
- 🎯 **Admin Panel** - CMS für Seiten, Lookbooks, User-Verwaltung
- 📄 **CMS System** - Pages/Blog/ProductPages mit SEO-Feldern (DC Meta, Schema JSON-LD)

## Tech Stack

- **Framework**: Next.js 13.5 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite (via Prisma) - easily migrateable to PostgreSQL
- **Authentication**: NextAuth.js
- **Payments**: Stripe
- **ORM**: Prisma

## Kibbe Typenanalyse

### Quiz-Flow:
1. **Landingpage**: `/typenanalyse` (SEO-optimiert, indexierbar)
2. **Multi-Step Quiz**: `/typenanalyse/start` (19 Fragen, Autosave, Progress Bar)
3. **Lead Capture**: E-Mail + Telefon + Consent
4. **Automatische User-Anlage**: Password-Generierung + E-Mail-Versand
5. **Ergebnis im Account**: `/account/typenanalyse` mit Upsell zu passendem Lookbook
6. **Stiltyp-Guides**: `/stiltyp/[type]` (13 Typen, SEO-Content-Assets)

### Scoring-Logik:
- 19 Fragen mit je 5 Antwortoptionen (A-E)
- Scoring auf D (Dramatic), N (Natural), R (Romantic), G (Gamine)
- Hybride Antworten (z.B. B = 0.5 D + 0.5 N)
- Automatische Typ-Ermittlung nach Kibbe-System (13 Typen)

### Typen:
Dramatic, Soft Dramatic, Flamboyant Natural, Natural, Soft Natural, Dramatic Classic, Classic, Soft Classic, Flamboyant Gamine, Gamine, Soft Gamine, Romantic, Theatrical Romantic

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Update `.env` with the following values:

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_SECRET="generate-a-secure-random-string-here"
NEXTAUTH_URL="http://localhost:3000"

# Stripe (get from https://dashboard.stripe.com/apikeys)
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_your_publishable_key"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Email (optional, for production)
EMAIL_SERVICE=resend  # 'resend', 'sendgrid', etc.
EMAIL_FROM=noreply@businessstylist.de
RESEND_API_KEY=your_api_key_here
```

**To generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 3. Database Setup

The database should already be initialized. If not, run:

```bash
npx prisma migrate dev
npx prisma generate
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
npm start
```

## CMS Features

### Admin Seiten-Verwaltung (`/admin/pages`)
Jede Seite (Page/BlogPost/ProductPage) hat folgende SEO-Felder:
- **Basic**: Title, Slug, Content, Status (Draft/Published)
- **SEO**: Title Tag, Meta Description, Canonical URL, Robots directives
- **OpenGraph**: Title, Description, Image
- **Twitter Cards**: Card Type
- **Dublin Core Meta**: DC Title, Description, Creator, Language, Date
- **Schema JSON-LD**: Frei editierbar als JSON

### Erweiterte Sitemap (`/sitemap.xml`)
Automatisch generiert aus:
- Statische Marketing-Seiten
- Veröffentlichte CMS-Pages
- Veröffentlichte Blog-Posts
- Alle 13 Stiltyp-Guide-Seiten
- Shop-Produktseiten

### LLM Crawler Guidance (`/llms.txt`)
Textdatei für LLM-Crawler mit:
- Projektbeschreibung
- Allow/Disallow Regeln (öffentlich vs. geschützt)
- URL-Listen (Collections)
- Kontaktinformationen

## Email Service

Das Projekt nutzt einen abstrakten Email-Service-Adapter (`lib/email/service.ts`):
- Development: Console-Log
- Production: Konfigurierbar via ENV (Resend, SendGrid, etc.)
- Generiert Welcome-Emails mit Passwort nach Quiz-Abschluss

## Content Migration

See the following files for content migration instructions:

- **`/content/BRANDING_TODO.md`** - Logo, colors, fonts, images
- **`/content/TODO_COPY.md`** - Text content for all pages
- **`/content/SEO_KEYWORDS.md`** - SEO strategy and keywords

## Key Routes

### Public Pages
- `/` - Homepage
- `/stilberatung` - Style consulting page
- `/typenanalyse` - Type analysis landing (SEO, indexable)
- `/typenanalyse/start` - Multi-step quiz (noindex)
- `/typenanalyse/erfolg` - Success page after quiz (noindex)
- `/preise` - Pricing
- `/shop` - Product overview
- `/stiltyp/[type]` - Kibbe type guides (13 types, SEO-optimized)
- `/business-outfit` - SEO cluster page
- `/capsule-wardrobe` - SEO cluster page
- `/farbtyp-beratung` - SEO cluster page

### User Area (requires login)
- `/account` - User dashboard
- `/account/typenanalyse` - Quiz result with upsell
- `/account/orders` - Order history (placeholder)
- `/account/lookbooks` - Personal lookbooks (placeholder)
- `/account/downloads` - Digital downloads (placeholder)

### Admin Area (ADMIN role required)
- `/admin` - Admin dashboard
- `/admin/pages` - CMS page management
- `/admin/lookbooks` - Lookbook upload & assignment
- `/admin/users` - User management
- `/admin/blog` - Blog management (placeholder)

### Legal
- `/impressum` - Imprint
- `/datenschutz` - Privacy policy
- `/agb` - Terms and conditions
- `/widerruf` - Right of withdrawal

### SEO
- `/sitemap.xml` - Dynamic sitemap
- `/robots.txt` - Robots directives
- `/llms.txt` - LLM crawler guidance

## Database Schema

Key models:
- **User** - Authentication, phone, role
- **Profile** - User preferences, soft delete
- **Product** - Shop products with Stripe integration
- **Order** - Purchase records
- **Invoice** - Stripe invoices
- **Lookbook** - PDF files with kibbeType assignment
- **UserLookbook** - User-Lookbook junction table
- **QuizResult** - Kibbe quiz results with scores
- **Message** - Admin-to-user messages
- **BlogPost** - Blog posts with full SEO fields
- **Page** - CMS pages with full SEO fields
- **ProductPage** - Product pages with full SEO fields

## Creating an Admin User

Use Prisma Studio:

```bash
npx prisma studio
```

1. Open `User` table
2. Create a new user with `role: "ADMIN"`
3. Hash password with bcrypt before storing

Or use bcryptjs in Node:
```javascript
const bcrypt = require('bcryptjs');
const hashedPassword = await bcrypt.hash('your-password', 10);
console.log(hashedPassword);
```

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

**Important**: For production, migrate to PostgreSQL

### Migrating to PostgreSQL

1. Update `prisma/schema.prisma` datasource to `postgresql`
2. Update `DATABASE_URL` in `.env`
3. Run `npx prisma migrate dev`

## Features To Be Completed

### High Priority
- [ ] Stripe Webhook Handler vollständig (`/api/stripe/webhook`)
- [ ] Lookbook Upload-Formular im Admin
- [ ] Rich Text Editor für CMS (z.B. TipTap, Lexical)
- [ ] Image Upload System
- [ ] User Account: Orders, Downloads, Lookbooks, Messages Subpages
- [ ] Email Service Production-Integration (Resend/SendGrid)

### Medium Priority
- [ ] Blog-Übersichtsseite und [slug] Rendering
- [ ] FAQ Page mit Accordion
- [ ] Über-Mich Seite
- [ ] Kontaktformular
- [ ] Preview-Modus für CMS-Pages
- [ ] Admin: Messages senden an User
- [ ] Admin: Blog-Editor
- [ ] Admin: Product-Editor

## License

Proprietary software for businessstylist.de
