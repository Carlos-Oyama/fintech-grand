import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { AuthContext } from './auth-context'
import type { AuthContextValue } from './auth-context'
import { DEMO_EMAIL, DEMO_PASSWORD } from './demoCredentials'

const SESSION_KEY = 'grand-demo-session'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem(SESSION_KEY) === 'active',
  )

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated,
      login: (email, password) => {
        if (email.trim().toLowerCase() !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
          return false
        }
        localStorage.setItem(SESSION_KEY, 'active')
        setIsAuthenticated(true)
        return true
      },
      logout: () => {
        localStorage.removeItem(SESSION_KEY)
        setIsAuthenticated(false)
      },
    }),
    [isAuthenticated],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
