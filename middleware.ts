import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

/*
export async function middleware(request: NextRequest) {
  return await updateSession(request)
}
*/

export async function middleware() {
  return
}


export const config = {
  matcher: [
    '/admin/:path*',
  ],
}
