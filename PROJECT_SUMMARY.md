# BoardPilot — AI Project Health for monday.com Sidekick

## Overview
BoardPilot is an AI-powered project intelligence app for monday.com that exposes three Sidekick skills. Users interact with it through natural language in the Sidekick chat interface.

## Live URLs
- **Landing Page:** https://boardpilot-monday.vercel.app
- **GitHub:** https://github.com/anish632/boardpilot-monday
- **Privacy:** https://boardpilot-monday.vercel.app/privacy
- **Terms:** https://boardpilot-monday.vercel.app/terms
- **Setup Guide:** https://boardpilot-monday.vercel.app/setup

## Architecture

### How Sidekick Skills Work
monday.com Sidekick skills are built on **automation workflow blocks**. The flow:
1. User asks Sidekick something (e.g., "How healthy is the Marketing board?")
2. Sidekick matches the request to a skill based on title/description
3. Sidekick extracts inputs and calls the skill's **Run URL** via HTTP POST
4. The skill processes the request and returns structured `outputFields`
5. Sidekick presents the output to the user in conversation

### Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS v3
- **AI:** Groq (Llama 3.3 70B Versatile)
- **API:** monday.com GraphQL API v2024-10
- **Auth:** JWT verification (monday.com signing secret) + shortLivedToken
- **Hosting:** Vercel

## Skills (3 Automation Action Blocks)

### 1. Analyze Board Health
- **Endpoint:** `POST /api/skills/analyze-health`
- **Input:** Board name or ID
- **Output:** Health score (0-100), risk signals, bottleneck analysis, AI recommendations
- **How it works:** Fetches all board items via GraphQL, computes metrics (overdue, stuck, unassigned, staleness), calculates a weighted health score, then sends data to Groq for narrative analysis

### 2. Draft Status Update
- **Endpoint:** `POST /api/skills/draft-status`
- **Input:** Board name or ID, optional audience (team/stakeholders)
- **Output:** Polished status update with done/in-progress/blocked/upcoming sections
- **How it works:** Categorizes items by status, sends to Groq to generate professional status update

### 3. Smart Prioritize
- **Endpoint:** `POST /api/skills/smart-prioritize`
- **Input:** Board name or ID
- **Output:** AI-ranked top 10 task list with reasoning and suggested actions
- **How it works:** Filters active items, sends to Groq for priority analysis based on deadlines, blockers, workload

## File Structure
```
boardpilot-monday/
├── app/
│   ├── page.tsx                          # Landing page (dark theme)
│   ├── layout.tsx                        # Root layout
│   ├── globals.css                       # Tailwind imports
│   ├── privacy/page.tsx                  # Privacy policy
│   ├── terms/page.tsx                    # Terms of service
│   ├── setup/page.tsx                    # Setup guide
│   └── api/
│       ├── auth/
│       │   ├── install/route.ts          # OAuth install redirect
│       │   └── callback/route.ts         # OAuth callback
│       └── skills/
│           ├── analyze-health/route.ts   # Board health analysis skill
│           ├── draft-status/route.ts     # Status update generation skill
│           └── smart-prioritize/route.ts # Task prioritization skill
├── lib/
│   ├── monday.ts                         # monday.com GraphQL client & helpers
│   ├── groq.ts                           # Groq AI client
│   └── auth.ts                           # JWT verification & token extraction
├── monday-app.json                       # App manifest with skill definitions
├── package.json
└── PROJECT_SUMMARY.md
```

## monday.com App Details
- **App ID:** 10924191
- **App Slug:** anishdasmails-team_boardpilot
- **Account:** anishdasmail's Team (33914895)

## monday.com Developer Center Setup

To register this app in monday.com:

1. Go to **Developer Center** → **Create App**
2. Add a **Sidekick Skill** app feature
3. Create 3 automation action blocks with these Run URLs:
   - `https://boardpilot-monday.vercel.app/api/skills/analyze-health`
   - `https://boardpilot-monday.vercel.app/api/skills/draft-status`
   - `https://boardpilot-monday.vercel.app/api/skills/smart-prioritize`
4. Configure input/output fields as defined in `monday-app.json`
5. Set OAuth redirect URL: `https://boardpilot-monday.vercel.app/api/auth/callback`
6. Add required scopes: `boards:read`, `users:read`

## Environment Variables (Vercel)
- `GROQ_API_KEY` — ✅ Set
- `MONDAY_CLIENT_ID` — Set after creating app in Developer Center
- `MONDAY_CLIENT_SECRET` — Set after creating app in Developer Center
- `MONDAY_SIGNING_SECRET` — Set after creating app in Developer Center
- `NEXT_PUBLIC_APP_URL` — `https://boardpilot-monday.vercel.app`

## Key Design Decisions
- **Fuzzy board name matching:** Users say board names, not IDs. We resolve names via search.
- **Graceful error messages:** Following Sidekick best practices — errors guide users, not confuse them.
- **No data storage:** All processing is real-time. No board data persisted.
- **Lazy Groq init:** Client initialized on first request to avoid build-time errors.

## Author
Anish Das, Das Group LLC — support@dasgroupllc.com
