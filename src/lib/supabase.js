import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

/**
 * Save a study plan to the database.
 * Returns the saved row, or null if Supabase isn't configured.
 */
export async function savePlan({ subjects, hoursPerDay, examDates, preferences, planJson }) {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('study_plans')
    .insert({
      subjects,
      hours_per_day: Number(hoursPerDay),
      exam_dates: examDates || null,
      preferences: preferences || null,
      plan_json: planJson,
    })
    .select()
    .single();

  if (error) {
    console.error('Failed to save plan:', error.message);
    return null;
  }
  return data;
}

/**
 * Load all saved study plans (most recent first).
 */
export async function loadPlans() {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('study_plans')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(20);

  if (error) {
    console.error('Failed to load plans:', error.message);
    return [];
  }
  return data;
}
