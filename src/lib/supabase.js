import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://foqffsqwewgieacynslr.supabase.co'
const SUPABASE_KEY = 'sb_publishable_vFn4cIe3MrEIsRqAFqSkjg_2RIdZFJb'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
})
