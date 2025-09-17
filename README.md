# CONGREGATE: Church Attendance Tracker Web App

## Project Overview
This capstone project builds a mobile-optimized web app for a church to track Sunday service attendance, enabling analytics to address low turnout. Church workers mark attendance via a searchable/sortable member list, while admins access a dashboard for reports and messaging absent members. The app uses an existing PostgreSQL database with minor modifications and prioritizes role-based access control (RBAC). Future expansions include QR code scanning.

**Target Audience**:
- Church workers: Mark attendance on mobile devices.
- Admins: Generate reports and send messages from dashboard.

**Scale**: Handles ~10 concurrent users with fast performance (<3s load time) and intuitive UI.

## Scope and Features

### Must-Have Features (MVP)
1. **User Authentication and RBAC**: JWT-based login with Passport.js. Workers view/mark attendance; admins access all features.
2. **Attendance Tracking**: Searchable/sortable member list (filter by gender: M/F/Other, demographic: Y/M/W). Mark "present" for services, tied to dates.
3. **Admin Dashboard**: View attendance data; generate weekly turnout reports (CSV/PDF); send customized messages (stubbed) or WhatsApp messages to absent members.
4. **Database Integration**: Extend existing PostgreSQL DB with `gender` and `demographic` fields; new `attendance` table for records.
5. **Mobile-Friendly UI**: Simple, responsive design for phones using Tailwind CSS.

### Nice-to-Have/Future Features
- QR code scanning for self-check-in by members.
- Analytics visualizations (e.g., turnout trends).
- Full WhatsApp integration (beyond stubs) via API (e.g., Twilio).

### Success Criteria
- Performance: <3s page loads, no crashes with 10 concurrent users.
- Usability: Intuitive UI (e.g., minimal clicks to mark attendance).
- Accuracy: Reports match DB data; messages target absent members correctly.
- Timeline: 5 days for MVP (solo developer).

### Constraints
- 5-day timeline limits scope to core features; message-sending may be stubbed.
- Budget: Use free-tier hosting (Vercel, Render).
- Next.js is new to developer; allocate learning time.

## Tech Stack
Chosen for JavaScript familiarity, except Next.js (new, but learnable via tutorials like Next.js docs or freeCodeCamp).

- **Frontend**: Next.js (React-based for SSR, mobile optimization).
- **Backend**: Node.js with Express.js (RESTful API, auth, DB queries).
- **Database**: PostgreSQL (existing; use Prisma ORM for schema mods, migrations).
- **Authentication**: JWT with Passport.js for RBAC (worker vs. admin).
- **Styling**: Tailwind CSS (responsive, lightweight).
- **Hosting**: Vercel (Next.js, free tier) + Render (backend, free tier).
- **Tools**: Git/GitHub for version control; Jest for testing.

**Stack Rationale**:
| Component | Choice | Pros | Cons |
|-----------|--------|------|------|
| Frontend | Next.js | Fast SSR, mobile-friendly, easy deployment. | Learning curve. |
| Backend | Node.js/Express | Familiar, quick API setup. | Manual scaling for future growth. |
| DB | PostgreSQL/Prisma | Robust, simplifies migrations. | Migration setup time. |
| Hosting | Vercel/Render | Free tiers, easy setup. | Limited resources for scaling. |

## Database Modifications
Existing table: `members` (ID, First Name, Last Name, Marital Status, Email, Phone, Department, Account Status).

**Proposed Changes**:
- Add to `members`:
  - `gender`: ENUM('M', 'F', 'Other').
  - `demographic`: ENUM('Y', 'M', 'W').
- New table: `attendance`:
  - `id`: SERIAL PRIMARY KEY.
  - `member_id`: INTEGER (foreign key to `members.ID`).
  - `date`: DATE.
  - `present`: BOOLEAN.
- Tool: Prisma for migrations (e.g., `npx prisma migrate dev`).

**Sample Prisma Schema**:
```prisma
model Members {
  id            Int         @id @default(autoincrement())
  firstName     String
  lastName      String
  maritalStatus String
  email         String
  phone         String
  department    String
  accountStatus String
  gender        String      // ENUM: M, F, Other
  demographic   String      // ENUM: Y, M, W
  attendance    Attendance[]
}

model Attendance {
  id        Int      @id @default(autoincrement())
  memberId  Int      @map("member_id")
  date      DateTime
  present   Boolean
  member    Members  @relation(fields: [memberId], references: [id])
}
```

## AI Integration Plan
AI (e.g., Grok, GitHub Copilot) accelerates development, especially for Next.js learning and tight timeline.

### AI for Feature Generation
- **Use Cases**:
  - Prototype searchable/sortable list (prompt: "Generate Next.js component for searchable member list with filters for gender/demographic").
  - Generate report logic (prompt: "Write Express route to generate CSV report of weekly attendance").
  - Stub message-sending (prompt: "Create API stub for sending WhatsApp messages to absent members").
- **Validation**: Manual code review; test in dev (e.g., `npm run dev`).
- **Tools**: Grok for brainstorming; Copilot for IDE suggestions.

### AI for Testing
- **Use Cases**:
  - Generate unit tests (prompt: "Write Jest tests for Express /attendance endpoint").
  - Generate frontend tests (prompt: "Write React Testing Library tests for member list component").
  - Identify edge cases (e.g., duplicate attendance entries).
- **Types**: Unit (APIs, components), integration (DB-to-API).
- **Coverage**: Aim for 70% due to timeline; prioritize critical paths (auth, attendance).
- **Tools**: Jest, React Testing Library; Cypress (if time allows).

### AI for Schema/API
- **Use Cases**:
  - Generate Prisma schema (as above; prompt: "Create Prisma schema for attendance tracking").
  - Define API specs (prompt: "Generate OpenAPI spec for /members and /attendance endpoints").
- **Endpoints** (RESTful):
  - `GET /api/members?gender=M&demographic=Y`: Filter members.
  - `POST /api/attendance`: Mark attendance.
  - `GET /api/reports/weekly`: Generate CSV/PDF report.
  - `POST /api/messages`: Send messages (stubbed).
- **Validation**: Test with Postman; ensure DB consistency.

## Roadmap/Timeline (5 Days)
- **Day 1**: Setup Next.js, Express, Prisma; modify DB schema (AI for schema).
- **Day 2**: Build searchable/sortable member list; attendance marking (AI for components).
- **Day 3**: Admin dashboard; basic report generation (AI for CSV logic).
- **Day 4**: Implement CSV/PDF downloads; stub message-sending (AI for stubs).
- **Day 5**: Write tests (AI-generated), deploy to Vercel/Render, polish UI.

## Getting Started
1. Clone: `git clone [repo-url]`.
2. Install: `npm install` (frontend/backend).
3. Setup .env: Add DB_URL, JWT_SECRET.
4. Migrate DB: `npx prisma migrate dev`.
5. Run: `npm run dev` (Next.js), `node server.js` (Express).

## Learning Resources
- Next.js: [Official Docs](https://nextjs.org/docs), [freeCodeCamp Tutorial](https://www.freecodecamp.org/news/learn-nextjs).
- Prisma: [Prisma Docs](https://www.prisma.io/docs).
- Tailwind CSS: [Tailwind Docs](https://tailwindcss.com/docs).
