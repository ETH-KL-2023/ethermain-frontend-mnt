import { createClient } from "@supabase/supabase-js";

export function getSupabase() {
  const supabaseUrl = "https://lmagzsnkudcnuacgrlqo.supabase.co";
  const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtYWd6c25rdWRjbnVhY2dybHFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcxMTI1NDAsImV4cCI6MjAxMjY4ODU0MH0.BK7GxhNI47eQk5kgmCv4wpIR3rS0BH3_EAoak6OeNUM";
  console.log(supabaseKey);
  const supabase = createClient(
    supabaseUrl,
    supabaseKey ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtYWd6c25rdWRjbnVhY2dybHFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcxMTI1NDAsImV4cCI6MjAxMjY4ODU0MH0.BK7GxhNI47eQk5kgmCv4wpIR3rS0BH3_EAoak6OeNUM"
  );
  return supabase;
}
