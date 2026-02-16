# ChambaEnUSA v2.0

Portal #1 en español para hispanos en EE.UU. que buscan certificarse en oficios como electricista, CDL, cosmetología, HVAC, etc.

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Setup environment variables
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
- Supabase URL and anon key
- Anthropic API key (for Claude)
- Resend API key (for emails)
- Airtable credentials (optional, for CRM)

### 3. Setup Supabase
```bash
# Create a new Supabase project at https://supabase.com

# Run the schema migrations
# Copy contents of supabase/schema.sql and run in Supabase SQL Editor

# Generate types
npm run db:generate
```

### 4. Start development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── app/
│   ├── page.tsx              # Homepage
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   ├── licencia-[slug]/      # Dynamic license pages
│   │   └── page.tsx
│   └── api/
│       ├── leads/            # Lead capture API
│       └── generate-content/ # AI content generation API
├── components/
│   ├── layout/
│   │   ├── header.tsx
│   │   └── footer.tsx
│   ├── license/
│   │   ├── license-header.tsx
│   │   ├── requirements-section.tsx
│   │   ├── schools-table.tsx
│   │   └── faq-section.tsx
│   └── lead-capture-form.tsx
├── lib/
│   ├── supabase/
│   │   ├── server.ts        # Server client
│   │   └── client.ts        # Browser client
│   ├── db/
│   │   └── queries.ts       # Database queries
│   └── utils.ts             # Utility functions
├── types/
│   └── database.types.ts    # Supabase types
├── supabase/
│   └── schema.sql           # Database schema
└── plans/
    └── migracion-nextjs-supabase-plan.md
```

## 🔧 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: TailwindCSS + Shadcn/UI
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **AI**: Claude API (Anthropic)
- **Email**: Resend
- **CRM**: Airtable (optional)
- **Hosting**: Vercel

## 📊 SEO Features

- Dynamic meta tags per page
- Structured data (Schema.org)
- Sitemap.xml generation
- Robots.txt
- Canonical URLs
- OpenGraph tags

## 🔄 ISR (Incremental Static Regeneration)

License pages use ISR with 1-hour revalidation:
```typescript
export const revalidate = 3600
```

## 📝 API Routes

### POST /api/leads
Capture leads from forms.

### POST /api/generate-content
Generate license content using Claude AI.

## 🗄️ Database Schema

See `supabase/schema.sql` for the complete database design.

Tables:
- `trades` - Oficios (electricista, CDL, cosmetología, etc.)
- `states` - Estados de EE.UU.
- `requirements` - Requisitos oficiales por oficio/estado
- `schools` - Escuelas bilingües
- `programs` - Programas de estudio
- `license_pages` - Páginas generadas
- `leads` - Captura de leads

## 🎯 KPIs (based on analytics)

- Current: ~18K impressions, 1% CTR
- Target: 500+ pages, 5% CTR, top 3 positions

## 📈 Next Steps

1. ✅ Setup project structure
2. ⬜ Implement homepage
3. ⬜ Create license page template
4. ⬜ Connect Supabase database
5. ⬜ Build lead capture system
6. ⬜ Implement AI content generation
7. ⬜ Add SEO optimizations
8. ⬜ Deploy to Vercel

## 📄 License

MIT
