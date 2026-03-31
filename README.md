# StudyFlow — AI Study Session Planner

AI web app that creates personalized weekly study schedules. Enter your subjects, hours, and exam dates — get a complete plan powered by Google Gemini AI.

**100% free to run** — uses Gemini free tier + Supabase free tier.

![React](https://img.shields.io/badge/React-19-blue)
![Vite](https://img.shields.io/badge/Vite-6-purple)
![Gemini](https://img.shields.io/badge/Gemini_AI-free-green)

## Features

- 📝 Input subjects, hours, exam dates, and learning preferences
- 🤖 Gemini AI generates a detailed 7-day study schedule
- 🎯 Study techniques (Pomodoro, Active Recall, Spaced Repetition, etc.)
- 📄 Export your plan as a PDF
- 💾 Auto-saves plans to Supabase (optional)
- 📱 Fully responsive

## Quick Start

### 1. Get a free Gemini API key

Go to **[aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)** and create a free API key. No credit card needed.

### 2. Clone and install

```bash
git clone https://github.com/your-username/ai-study-session-planner.git
cd ai-study-session-planner
npm install
```

### 3. Add your API key

```bash
cp .env.example .env
```

Open `.env` and paste your Gemini key:

```
VITE_GEMINI_API_KEY=your_key_here
```

Supabase keys are optional — the app works fine without them.

### 4. Run it

```bash
npm run dev
```

Open **http://localhost:3000** — done!

## Adding Supabase (optional)

If you want to save study plans to a database:

1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **Settings → API** and copy your URL + anon key
3. Add them to `.env`:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```
4. Go to **SQL Editor** in Supabase and run the contents of `supabase/migration_001_create_study_plans.sql`

## Project Structure

```
src/
├── components/
│   ├── Header.jsx + .css
│   ├── StudyForm.jsx + .css
│   ├── StudyPlan.jsx + .css
│   └── LoadingSkeleton.jsx + .css
├── lib/
│   ├── gemini.js          ← Gemini AI integration
│   ├── supabase.js        ← Supabase client + save/load
│   └── exportPdf.js       ← PDF export
├── styles/
│   └── global.css
├── App.jsx + .css
└── main.jsx
```

## Tech Stack

- **Frontend:** React 19 + Vite 6
- **AI:** Google Gemini 2.0 Flash (free tier)
- **Database:** Supabase (free tier, optional)
- **Fonts:** Fraunces + DM Sans
- **PDF:** Browser print API

## Roadmap

- [ ] User authentication (Supabase Auth)
- [ ] Save & browse past study plans
- [ ] Dark mode
- [ ] Drag-and-drop to rearrange sessions
- [ ] Calendar export (.ics)

## License

MIT
