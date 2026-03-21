'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, FileText, Settings, LogOut, Type, Users, Calendar, Briefcase } from 'lucide-react'
import { logout } from './login/actions'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Articole Blog', href: '/admin/posts', icon: FileText },
  { name: 'Texte Site', href: '/admin/content', icon: Type },
  { name: 'Echipă', href: '/admin/team', icon: Users },
  { name: 'Proiecte', href: '/admin/projects', icon: Briefcase },
  { name: 'Evenimente', href: '/admin/events', icon: Calendar },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Nu afișăm meniul pe pagina de login
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-border flex flex-col fixed inset-y-0 z-10">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
              <span className="font-syne font-700 text-white text-sm">AI</span>
            </div>
            <span className="font-syne font-700 text-text-primary">Admin Panel</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-grotesk text-sm transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-text-secondary hover:bg-slate-100 hover:text-text-primary'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-primary' : 'text-muted'} />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-border mt-auto">
          <form action={logout}>
            <button
              type="submit"
              className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg font-grotesk text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut size={18} />
              Deconectare
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
