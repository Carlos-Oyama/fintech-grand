import { useState } from 'react'
import type { FormEvent } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import { DEMO_EMAIL, DEMO_PASSWORD } from '../auth/demoCredentials'
import heroImage from '../assets/hero.png'

export function LoginPage() {
  const { isAuthenticated, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (isAuthenticated) return <Navigate to="/app" replace />

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!email.trim() || !password) {
      setError('Informe seu e-mail e sua senha.')
      return
    }
    if (!login(email, password)) {
      setError('E-mail ou senha inválidos. Confira os dados da conta de teste.')
      return
    }
    const state = location.state as { from?: { pathname?: string } } | null
    const destination = state?.from?.pathname ?? '/app'
    navigate(destination, { replace: true })
  }

  return (
    <main className="login-page">
      <section className="login-intro">
        <div className="login-brand">
          <span className="brand-mark">G</span>
          <span>grand<span className="brand-light">.</span></span>
        </div>
        <div className="login-pitch">
          <span className="pill"><i /> FINANÇAS MAIS SIMPLES</span>
          <h1>Clareza para cuidar do seu dinheiro.</h1>
          <p>Receitas, despesas e investimentos em um só lugar. Organize suas finanças com leveza.</p>
        </div>
        <img className="login-art" src={heroImage} alt="" />
        <p className="login-footnote">Uma visão completa. Decisões melhores.</p>
      </section>
      <section className="login-panel">
        <div className="login-form-wrap">
          <p className="eyebrow">BEM-VINDO DE VOLTA</p>
          <h2>Acesse sua conta</h2>
          <p className="login-subtitle">Entre para continuar no seu espaço financeiro.</p>
          {error && <div className="alert alert-error" role="alert">{error}</div>}
          <form className="login-form" onSubmit={handleSubmit}>
            <label className="field">
              <span>E-mail</span>
              <input
                type="email"
                autoComplete="username"
                placeholder="voce@exemplo.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>
            <label className="field">
              <span>Senha</span>
              <input
                type="password"
                autoComplete="current-password"
                placeholder="Sua senha"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </label>
            <button type="submit" className="button button-primary login-submit">Entrar <span aria-hidden="true">→</span></button>
          </form>
          <div className="demo-note">
            <strong>Acesso de demonstração</strong>
            <span>{DEMO_EMAIL}</span>
            <span>{DEMO_PASSWORD}</span>
            <small>Autenticação demonstrativa local, sem validação de credenciais pelo backend.</small>
          </div>
        </div>
        <span className="login-copyright">© 2026 Grand Finanças</span>
      </section>
    </main>
  )
}
