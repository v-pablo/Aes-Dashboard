import { createClient } from '@supabase/supabase-js'

// These automatically load from your .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Safety check to warn you in the console if keys are missing
if (!supabaseUrl || !supabaseKey) {
  console.error('⚠️ Supabase keys are missing! Check your .env file.')
}

// Create and export the connection
export const supabase = createClient(supabaseUrl, supabaseKey)