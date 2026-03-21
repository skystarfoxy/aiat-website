import { login } from './actions'

export default function LoginPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-card border border-border">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mx-auto mb-4">
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
              <path d="M12 3 L21 20 H3 Z" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round" />
              <line x1="7.5" y1="14" x2="16.5" y2="14" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
          <h1 className="font-syne font-700 text-2xl text-text-primary">Administrare</h1>
          <p className="text-sm text-text-secondary mt-2">AI Transilvania</p>
        </div>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              placeholder="admin@ia-transilvania.eu"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1" htmlFor="password">
              Parolă
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              placeholder="••••••••"
            />
          </div>

          {searchParams.error && (
            <div className="text-red-500 text-sm py-2 px-3 bg-red-50 rounded-lg">
              {searchParams.error}
            </div>
          )}

          <button
            formAction={login}
            className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-2.5 rounded-lg transition-colors"
          >
            Autentificare
          </button>
        </form>
      </div>
    </div>
  )
}
