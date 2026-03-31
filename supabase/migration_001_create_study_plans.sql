-- Run this in your Supabase SQL Editor (optional — app works without it)
-- Creates the study_plans table for saving generated plans

CREATE TABLE IF NOT EXISTS study_plans (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at  TIMESTAMPTZ DEFAULT now(),
  subjects    TEXT NOT NULL,
  hours_per_day INTEGER,
  exam_dates  TEXT,
  preferences TEXT,
  plan_json   JSONB NOT NULL
);

-- Enable Row Level Security
ALTER TABLE study_plans ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert and read (open access for now)
-- Replace with proper auth policies when you add login
CREATE POLICY "Allow public insert" ON study_plans FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select" ON study_plans FOR SELECT USING (true);
