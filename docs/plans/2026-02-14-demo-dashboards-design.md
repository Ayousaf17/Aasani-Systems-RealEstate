# Demo Dashboards — 7 System Mockups for Client Presentations

**Date**: 2026-02-14
**Status**: Approved
**Purpose**: Interactive mockup dashboards for each of the 7 core real estate automation systems, shown to clients during sales meetings.

---

## Route

`/demo` — New page in the existing aasani-systems-app

## Layout

- Left sidebar with 7 system nav items (icon + label)
- Main content area shows the active system's dashboard mockup
- Top bar with "AASANI SYSTEMS — LIVE DEMO" branding
- All fake data uses realistic Austin, TX real estate context
- Dark theme matching existing design system (neutral-950 bg, teal accents, glass panels, Space Grotesk)

## 7 System Mockups

### 1. Instant Lead Response
- Live feed of incoming leads (name, source, timestamp, auto-response status)
- SMS preview panel showing the auto-reply sent
- Response timer showing "<60 seconds"
- KPIs: Avg Response Time, Leads Today, Auto-Responses Sent, Hot Leads Flagged

### 2. Lead Qualification & Scoring
- Lead cards grid with score badges (0-100), color-coded: Hot (green 50+), Warm (yellow 20-49), Cold (gray 0-19)
- Activity timeline for selected lead (opened email, clicked listing, visited site)
- Score distribution chart
- KPIs: Hot Leads, Avg Score, Conversion Rate by Tier

### 3. Smart CRM Follow-Up
- Active sequences list with progress bars
- Email preview cards showing what was sent
- Behavior trigger indicators (lead opened 3x, clicked price drop)
- KPIs: Active Sequences, Open Rate, Reply Rate, Sequences Completed

### 4. Appointment Scheduling
- Weekly calendar grid with color-coded appointments (showing, consultation, follow-up)
- Upcoming appointments sidebar with reminder status
- No-show tracking
- KPIs: This Week, No-Show Rate, Hours Saved, Reminders Sent

### 5. Transaction Coordination
- Kanban-style columns: Under Contract → Inspection → Appraisal → Clear to Close → Closed
- Deal cards with buyer name, property, progress %, days to close
- Deadline alerts (red for overdue, yellow for upcoming)
- KPIs: Active Transactions, On-Time Rate, Avg Days to Close

### 6. Client Communication
- Monthly touchpoint calendar
- Newsletter preview panel
- Neighborhood market stats (median price, days on market charts)
- KPIs: Contacts Reached, Open Rate, Referral Rate, Past Clients Active

### 7. Review & Referral Generation
- Google/Zillow star rating display
- Review request pipeline (sent → opened → completed)
- Recent reviews feed with star ratings
- Referral leaderboard (top referring clients)
- KPIs: Avg Rating, Reviews This Month, Referral Conversion, Total Referrals

## Design Tokens

- Background: `bg-neutral-950` / `#111212`
- Glass panels: `.glass-panel` (rgba(23,23,23,0.6) + blur)
- Accent: `teal-500`, `teal-400`, `teal-300`
- Text: `text-white` / `text-aasani-text-muted`
- Font: Space Grotesk
- Patterns: `bg-grid-pattern` for subtle backgrounds

## Tech

- React components in `src/components/demo/`
- Page at `src/pages/DemoPage.tsx`
- Mock data in `src/data/demoData.ts`
- No external dependencies beyond what's already installed
