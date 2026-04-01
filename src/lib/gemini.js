import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const SYSTEM_PROMPT = `You are StudyFlow, an expert academic coach. Given a student's subjects, available hours, exam dates, and learning preferences, create a detailed, actionable weekly study schedule.

You MUST return ONLY valid JSON with this exact structure (no markdown, no code fences, no extra text):
{
  "title": "Personalized Study Plan",
  "summary": "A brief 1-2 sentence overview of the plan",
  "weeklyPlan": [
    {
      "day": "Monday",
      "sessions": [
        {
          "time": "9:00 AM - 10:30 AM",
          "subject": "Mathematics",
          "topic": "Specific topic to study",
          "activity": "What to do during this session",
          "technique": "Pomodoro / Active Recall / Spaced Repetition / etc."
        }
      ]
    }
  ],
  "tips": ["Tip 1", "Tip 2", "Tip 3"]
}

Rules:
- Include all 7 days (Monday through Sunday)
- Respect the student's available hours per day
- Prioritize subjects with upcoming exams
- Vary study techniques across sessions
- Include short breaks between sessions
- Return ONLY the JSON object, nothing else`;

export async function generateStudyPlan({ subjects, hoursPerDay, examDates, preferences }) {
  if (!GEMINI_API_KEY) {
    throw new Error(
      'Gemini API key not found. Add VITE_GEMINI_API_KEY to your .env file. Get a free key at https://aistudio.google.com/app/apikey'
    );
  }

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    systemInstruction: SYSTEM_PROMPT,
  });

  const userMessage = `Create a study plan with these details:

Subjects: ${subjects}
Hours available per day: ${hoursPerDay}
Exam dates / deadlines: ${examDates || 'None specified'}
Learning preferences / notes: ${preferences || 'None specified'}`;

  const result = await model.generateContent(userMessage);
  const text = result.response.text();

  try {
    return JSON.parse(text);
  } catch {
    // Strip markdown fences if Gemini wrapped the response
    const cleaned = text.replace(/```json\n?|```/g, '').trim();
    return JSON.parse(cleaned);
  }
}
