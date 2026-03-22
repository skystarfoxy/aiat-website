import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  let supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

  // Sanitizare: elimină ghilimelele și spațiile
  supabaseUrl = supabaseUrl.trim().replace(/^["']|["']$/g, '')
  supabaseAnonKey = supabaseAnonKey.trim().replace(/^["']|["']$/g, '')

  return createBrowserClient(
    supabaseUrl,
    supabaseAnonKey
  )
}
