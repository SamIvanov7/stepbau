# STEPBAU Landing Page - PRD

## Original Problem Statement
Professional landing page for STEPBAU - German construction subcontractor (Nachunternehmer) specializing in Trockenbau, Bodenverlegung, and Innenausbau. Based in Leipzig, operating nationwide.

## User Personas
- Generalunternehmen, Bauleiter, Projektleiter, Architekten, Bauunternehmen, Bauträger

## Core Requirements
- Dark theme landing page with teal accent (#00b4d8)
- Bilingual DE/EN with language toggle
- Contact form saving to MongoDB
- DSGVO-compliant (cookie banner, Datenschutz checkbox, Impressum/Datenschutz pages)
- SEO optimized meta tags
- Fully responsive

## What's Been Implemented (Dec 2025)
- Hero section with construction background, CTAs (call + request quote)
- About section (Über uns) with company description + 4 trust icons
- Services section - 6 cards (Trockenbau, Spachtel, Boden, Untergrund, Gewerb, Wohnungsbau)
- Why us section - 5 numbered trust items
- Coverage section with Google Maps iframe (Leipzig) + location info
- Contact form (Name, Firma, Telefon, Email, Nachricht, Datenschutz) → POST /api/contact
- Contact info panel (address, phone, email, WhatsApp)
- Footer with Impressum/Datenschutz dialogs
- Cookie banner (DSGVO) with localStorage persistence
- Language toggle DE/EN in header
- Mobile hamburger menu (Sheet component)
- Glass morphism navbar, neon border effects, scroll animations
- Email validation on backend (EmailStr)
- SEO meta tags (title, description, keywords, Open Graph)

## Prioritized Backlog
### P0 (Critical)
- None remaining

### P1 (Important)
- Email notification integration (SendGrid/SMTP) for form submissions
- Admin panel to view contact submissions

### P2 (Nice to have)
- Framer Motion for richer animations
- Image gallery/portfolio of completed projects
- Testimonials section
- Blog/News section
- Google Analytics integration

## Next Tasks
1. Set up email sending (SMTP/SendGrid) for form submissions to step.bau@outlook.de
2. Add project portfolio/gallery section with real project photos
3. Add WhatsApp floating button
