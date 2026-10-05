# ASAP Academy – Website

Marketing and course catalogue website for **ASAP Academy** (SAP training institute), built with **Next.js 16 (App Router)**, **TypeScript** and **Tailwind CSS v4** only (no other UI libraries).

## Getting started

```bash
npm install
cp .env.example .env.local   # optional
npm run dev                  # http://localhost:3000
```

| Script          | Description               |
| --------------- | ------------------------- |
| `npm run dev`   | Start development server  |
| `npm run build` | Production build          |
| `npm run start` | Serve the production build |
| `npm run lint`  | Run ESLint                |

## Pages

| Route                  | Description                                             |
| ---------------------- | ------------------------------------------------------- |
| `/`                    | Home: hero, modules, popular courses, why us, FAQ        |
| `/courses`             | All courses with search, category and level filters     |
| `/courses/[slug]`      | Course detail: overview, syllabus, careers, enquiry form |
| `/about`               | About the academy                                       |
| `/corporate-training`  | Corporate / team training + proposal form               |
| `/contact`             | Contact details + enquiry form                          |

## Project structure

```
src/
  app/                 Routes (App Router), sitemap, robots, icons
  assets/brand/        Logo variants generated from the client logo
  components/
    courses/           CourseCard, CourseExplorer (filters)
    forms/             EnquiryForm
    home/              Home page sections
    layout/            Navbar, Footer, WhatsApp button
    ui/                Button, Container, Icon, Logo, PageHeader, SectionHeading
  config/site.ts       Name, contact details, social links, navigation
  data/                Course catalogue, categories, home page content
  lib/
    api.ts             HTTP client for the future Python backend
    courses.ts         Data-access functions used by all pages
  types/               Shared TypeScript types
scripts/
  prepare-logo.mjs     Regenerates logo assets and favicons from the source logo
```

## Brand theme

Colours are sampled from the logo and defined as Tailwind theme tokens in `src/app/globals.css`:

- `brand-*`: logo blue (`brand-600` = `#2056C3`)
- `ink-*`: logo black, extended into a navy-tinted neutral scale
- Fonts: **Montserrat** (headings, matches the logo lettering) and **Inter** (body)

To regenerate the logo assets after a logo change:

```bash
node scripts/prepare-logo.mjs path/to/logo.jpg
```

## Editing content

- **Branches (address, phone, hours, map pin), contact email, social links:** `src/config/site.ts`.
  Each branch's map uses its Google Plus Code (`plusCode`) for an exact pin; add a new branch by appending to `branches`.
- **Courses & syllabus:** `src/data/courses.ts`
- **Categories:** `src/data/categories.ts`
- **Stats, testimonials, FAQ, features:** `src/data/content.ts`

## Connecting the Python backend

The frontend is ready for a FastAPI / Django backend:

1. Set `NEXT_PUBLIC_API_URL` in `.env.local` (e.g. `http://localhost:8000/api`).
2. **Enquiry form** posts JSON to `POST {NEXT_PUBLIC_API_URL}/enquiries`:

   ```json
   {
     "name": "string",
     "email": "string",
     "phone": "string",
     "course": "sap-fico",
     "mode": "online | classroom | weekend | corporate",
     "message": "string",
     "source": "contact | course | corporate"
   }
   ```

   Return `2xx` on success; on error return `{ "detail": "message" }` (FastAPI's default), which is shown to the user.
   Until the API is configured, enquiries are logged to the browser console in development.

3. **Course catalogue:** every page reads data via `src/lib/courses.ts`. To serve courses from the backend, replace the function bodies with `apiGet<Course[]>("/courses")` etc. The response shape should match `src/types/course.ts`.

Remember to enable CORS on the backend for the website's origin.
# Asap-Ac
