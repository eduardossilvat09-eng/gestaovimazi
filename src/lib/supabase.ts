import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  "https://quguzeavkwezgvuwwgln.supabase.co";

const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1Z3V6ZWF2a3dlemd2dXd3Z2xuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyMDcwOTgsImV4cCI6MjA5NDc4MzA5OH0.VA1D1KkrZhJ3G85BKY91qGm0lQ2Va7srFzu03pA91hU";

export const supabase =
  createClient(
    supabaseUrl,
    supabaseAnonKey
  );
  