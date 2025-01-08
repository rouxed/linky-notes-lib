import { createClient } from '@supabase/supabase-js';

// Access environment variables provided by Lovable's Supabase integration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables. Make sure you have connected your Supabase project in Lovable.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);