import { createClient } from '@supabase/supabase-js';

// Access environment variables provided by Lovable's Supabase integration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a dummy client that throws informative errors when methods are called
const dummyClient = {
  from: () => {
    throw new Error('Please connect your Supabase project in Lovable before using database features.');
  },
  // Add other commonly used methods
  auth: {
    signIn: () => {
      throw new Error('Please connect your Supabase project in Lovable before using authentication features.');
    },
    signOut: () => {
      throw new Error('Please connect your Supabase project in Lovable before using authentication features.');
    }
  }
};

// Export either the real client or the dummy client
export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : dummyClient;