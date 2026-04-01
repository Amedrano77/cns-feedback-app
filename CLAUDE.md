# CLAUDE.md — CNS Feedback App

AI assistant guide for understanding, developing, and maintaining this codebase.

-----

## Current Status

### ✅ Stable (do not refactor)

- Firebase auth flow (login/register/logout)
- Feedback CRUD with Firestore (`addDoc`, `getDocs`, `onSnapshot`)
- Real-time presence system (`presence` collection)
- Activity feed (`activity` collection)
- AI feedback generation via Netlify function
- Canvas LMS proxy integration (Cloudflare Worker)
- Course grid and feedback filtering (18 courses)

### 🚧 In Progress

- *(update this at the end of each session)*

### ❌ Known Issues / Workarounds

- *(document any bugs or workarounds here)*

-----

## Last Session

- **Completed:** *(fill in at end of session)*
- **Next up:** *(fill in at end of session)*
- **Files touched:** *(fill in at end of session)*

> At the end of every session, ask Claude: "Update the Last Session section in CLAUDE.md" then commit it.

-----

## Architecture Decisions

These are intentional — do not suggest changing them without explicit user request:

|Decision                                       |Reason                                                                   |
|-----------------------------------------------|-------------------------------------------------------------------------|
|Single `index.html` file                       |Zero build step, easy Netlify deploy, no toolchain to maintain           |
|Vanilla JS, no frameworks                      |Solo instructor tool — simplicity beats scalability here                 |
|No npm / no package.json                       |Intentional. Do not introduce dependencies.                              |
|No TypeScript                                  |Intentional. Match existing style.                                       |
|Firebase config keys are public in `index.html`|Safe by design — security is enforced via Firestore Rules, not key hiding|
|Canvas API proxied through Cloudflare Worker   |Required to handle CORS from the browser                                 |
|Anthropic API key is server-side only          |Lives in Netlify env var `ANTHROPIC_API_KEY`, never client-side          |

-----

## Project Overview

**CNS Feedback App** is a real-time, collaborative feedback management tool for CNS (Computer and Network Systems) instructors. It lets instructors create, share, and reuse feedback comments across 18 CNS courses.

**Tech stack summary:**

- Frontend: Vanilla HTML/CSS/JavaScript (zero build step, zero npm dependencies)
- Database/Auth: Firebase Firestore + Firebase Authentication
- Serverless backend: Netlify Functions
- AI: Anthropic Claude API (`claude-sonnet-4-20250514`)
- Canvas LMS integration: via a Cloudflare Workers proxy

-----

## Repository Structure

```
cns-feedback-app/
├── index.html                     # Entire frontend application (single file)
├── index-placeholder.html         # Backup/reference copy
├── netlify/
│   └── functions/
│       └── generate-feedback.js   # Netlify serverless function (AI feedback)
└── README.md                      # End-user documentation
```

This is intentionally a **single-file application** — all HTML, CSS, and JavaScript live in `index.html`. There is no build toolchain, no package.json, and no transpilation step.

-----

## Architecture

### Frontend (`index.html`)

The app is a single-page application with view-based navigation. Views are shown/hidden via CSS classes. Key views:

|View          |DOM ID                       |Purpose                          |
|--------------|-----------------------------|---------------------------------|
|Auth          |`#loginForm`, `#registerForm`|Sign in / sign up                |
|Home          |`#homeView`                  |Course grid, stats, activity feed|
|Course        |`#courseView`                |Feedback list with search/filter |
|Feedback Modal|`#feedbackModal`             |Add new feedback entry           |
|Canvas Panel  |(floating)                   |Import from Canvas LMS           |

**File layout within `index.html`:**

- Lines 1–6: HTML head, Firebase CDN imports
- Lines 7–97: Embedded CSS (`<style>`)
- Lines 98–259: HTML structure
- Lines 260–670: Embedded JavaScript (`<script>`)
- Lines 671–719: Canvas integration panel HTML

### Backend (`netlify/functions/generate-feedback.js`)

A single Netlify Function that:

1. Receives `{ assignmentName, instructions, performanceLevel }` via POST
1. Calls Anthropic API with a structured prompt
1. Returns `{ feedback: "..." }`

The Anthropic API key is stored as a **Netlify environment variable** (`ANTHROPIC_API_KEY`) — never in source code.

-----

## Firebase Data Models

### `feedback` collection

```
{
  courseNumber: string,        // e.g. "ITNW 1308"
  courseName: string,          // e.g. "Client OS"
  module: number,
  lessonNumber: string,        // e.g. "1", "1a", "2b"
  assignmentType: string,      // "quiz" | "lab" | "discussion" | etc.
  assignmentName: string,
  feedbackText: string,
  performanceLevel: string,    // "excellent" | "satisfactory" | "needs-improvement"
  instructorId: string,        // Firebase UID
  instructorName: string,
  instructorEmail: string,
  createdAt: Timestamp,
  learningOutcomes: array
}
```

### `users` collection

```
{ name, email, role: "instructor", createdAt }
```

### `activity` collection

```
{ userId, userName, text, timestamp }
```

### `presence` collection (real-time)

```
{ userId, userName, online: boolean, lastSeen: Timestamp }
```

-----

## Key JavaScript Globals (State)

|Variable          |Purpose                                               |
|------------------|------------------------------------------------------|
|`currentUser`     |Authenticated Firebase user object                    |
|`currentCourse`   |Currently selected course string                      |
|`feedbackListener`|Active Firestore `onSnapshot` unsubscribe function    |
|`activityListener`|Active activity feed `onSnapshot` unsubscribe function|
|`cvState`         |Canvas integration state object                       |

-----

## Naming Conventions

- **Functions**: `camelCase` — e.g., `loadFeedback`, `openAddModal`
- **Canvas functions**: `cv` prefix — e.g., `cvConnect`, `cvGet`, `cvLoadAssignments`
- **DOM IDs**: hyphen-separated — e.g., `feedbackModal`, `courseTitle`
- **CSS classes**: hyphen-separated — e.g., `feedback-card`, `performance-badge`
- No TypeScript, no JSDoc required

-----

## External Integrations

### Canvas LMS

Canvas API calls are proxied through a Cloudflare Worker to handle CORS:

- **Proxy base URL**: `https://twilight-wildflower-c067.amedrano5802.workers.dev`
- Canvas credentials (URL + API token) are stored in `localStorage` by the user at runtime
- Supported endpoints: list courses, list assignments, get assignment details

### Anthropic API

- Called exclusively from `netlify/functions/generate-feedback.js`
- Model: `claude-sonnet-4-20250514`
- API key: stored in Netlify env as `ANTHROPIC_API_KEY`
- Never expose the API key client-side

### Firebase (client-side)

- Firebase config keys (in `index.html`) are intentionally public — Firebase security is enforced via Firestore Security Rules, not by hiding keys
- Uses Firebase v9 compat SDK via CDN

-----

## Development Workflow

### Running locally

1. Open `index.html` directly in a browser — no server required for the frontend
1. Firebase connects automatically using the embedded config
1. To test the Netlify function locally, install Netlify CLI and run `netlify dev`

### Making changes

- Edit `index.html` for any frontend change (HTML, CSS, or JavaScript)
- Edit `netlify/functions/generate-feedback.js` for AI/backend changes
- Reload the browser to see changes — no build step needed

### Deployment

The app deploys to Netlify:

- Drag-and-drop `index.html`, or connect the GitHub repo in Netlify dashboard
- Set `ANTHROPIC_API_KEY` in Netlify environment variables
- The Netlify function deploys automatically from `netlify/functions/`

-----

## Supported Courses

The app supports these 18 CNS courses (hardcoded in `index.html`):

ITNW 1308, ITNW 1325, ITNW 1345, ITNW 1354, ITNW 2313, ITNW 2354,
ITSE 1302, ITSE 1311, ITSE 1359, ITSE 2302, ITSE 2309, ITSE 2459,
ITSC 1316, ITSC 1325, ITSC 2439, ITNW 2388, ITSE 2388, ITSC 2388

To add a course, locate the course list array/object in `index.html` and add the new entry in the same format.

-----

## AI Assistant Guidelines

### When adding features

- Keep everything in `index.html` unless it requires server-side execution (then use Netlify Functions)
- Do not introduce a build step or npm dependencies without explicit user request
- Match the existing vanilla JS style — no frameworks, no TypeScript
- Reuse the established Firebase async patterns (`onSnapshot`, `addDoc`, `getDocs`)

### When modifying the AI feedback feature

- Only modify `netlify/functions/generate-feedback.js`
- The `ANTHROPIC_API_KEY` must stay server-side only
- Use the `claude-sonnet-4-20250514` model or newer, as appropriate
- Keep the request/response shape: `{ assignmentName, instructions, performanceLevel }` → `{ feedback }`

### Security rules

- Never hardcode `ANTHROPIC_API_KEY` or Canvas API tokens in source files
- Firebase config keys in `index.html` are safe to leave as-is (public by design)
- Canvas tokens are user-supplied at runtime — do not log or transmit them beyond the proxy calls

### What does NOT exist (don't assume it does)

- No `package.json` or npm scripts
- No TypeScript or type definitions
- No test suite or test runner
- No linting or formatting configuration
- No CI/CD pipeline
- No environment variable file (`.env`)

-----

## Branch & Commit Conventions

- Development branch for documentation: `claude/add-claude-documentation-gphBm`
- Main branch: `main`
- Commit messages are short and descriptive (see git log for examples)
- Signing key configured at `/home/claude/.ssh/commit_signing_key.pub`
