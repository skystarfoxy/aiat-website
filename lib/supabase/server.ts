import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  try {
    const cookieStore = cookies()

    let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    let supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // Sanitizare: elimină ghilimelele și spațiile dacă utilizatorul le-a pus din greșeală în Hostinger
    if (supabaseUrl) {
      supabaseUrl = supabaseUrl.trim().replace(/^["']|["']$/g, '')
    }
    if (supabaseAnonKey) {
      supabaseAnonKey = supabaseAnonKey.trim().replace(/^["']|["']$/g, '')
    }

    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn('Supabase core environment variables are missing. Returning null client.')
      return null as any
    }

    return createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            try {
              cookieStore.set({ name, value, ...options })
            } catch (error) {
              // Ignore server component set errors
            }
          },
          remove(name: string, options: CookieOptions) {
            try {
              cookieStore.set({ name, value: '', ...options })
            } catch (error) {
              // Ignore server component delete errors
            }
          },
        },
      }
    )
  } catch (error) {
    console.error('CRITICAL: createClient failed:', error)
    return null as any
  }
}
