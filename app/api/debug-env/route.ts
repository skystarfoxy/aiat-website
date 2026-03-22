import { NextResponse } from 'next/server'

// Rută temporară de debug — ȘTERGE după rezolvare!
export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  return NextResponse.json({
    NEXT_PUBLIC_SUPABASE_URL: url ? `SET (${url.substring(0, 30)}...)` : 'NOT SET',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: key ? `SET (length: ${key.length})` : 'NOT SET',
    RESEND_API_KEY: process.env.RESEND_API_KEY ? 'SET' : 'NOT SET',
    NODE_ENV: process.env.NODE_ENV,
    envKeys: Object.keys(process.env).filter(k => k.includes('SUPABASE') || k.includes('RESEND')),
  })
}
