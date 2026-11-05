import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api'
import type { EntityRecord } from '../api'
import { resources } from '../data/resources'

export function HomePage() {
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [recentUsers, setRecentUsers] = useState<EntityRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [apiError, setApiError] = useState('')
  const [today] = useState(() => new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  }).format(new Date()))

  useEffect(() => {
    let active = true
    async function loadDashboard() {
      setLoading(true)
      const results = await Promise.allSettled(
        resources.map(async (resource) => ({
          path: resource.path,
          items: await api.list(resource.path),
        })),
      )
      if (!active) return

      const nextCounts: Record<string, number> = {}
      let failed = false
      for (const result of results) {
        if (result.status === 'fulfilled') {
          nextCounts[result.value.path] = result.value.items.length
          if (result.value.path === 'usuarios') {
            setRecentUsers(result.value.items.slice(-4).reverse())
          }
        } else {
          failed = true
        }
      }
      setCounts(nextCounts)
      setApiError(failed ? 'Alguns dados não puderam ser carregados. Verifique a conexão com a API.' : '')
      setLoading(false)
    }
    void loadDashboard()
    return () => { active = false }
  }, [])

  return (
    <>
      <section className="welcome-banner">
        <div>
          <p className="eyebrow">{today.toLocaleUpperCase('pt-BR')}</p>
          <h1>Seu dinheiro, em perspectiva.</h1>
          <p>Bem-vindo ao seu espaço financeiro. Aqui está o resumo dos seus cadastros.</p>
        </div>
        <div className="banner-decoration" aria-hidden="true"><span>G</span></div>
      </section>

      {apiError && <div className="alert alert-error" role="status">{apiError}</div>}

      <div className="section-title">
        <div><p className="eyebrow">RESUMO</p><h2>Visão geral</h2></div>
        <span className="live-tag"><i /> Dados da API</span>
      </div>

      <section className="stats-grid" aria-label="Resumo dos registros">
        {resources.map((resource, index) => (
          <Link className="stat-card" to={`/app/${resource.path}`} key={resource.path}>
            <div className={`stat-icon stat-icon-${index}`} aria-hidden="true">{resource.title.slice(0, 1)}</div>
            <div className="stat-label">{resource.title}</div>
            <div className="stat-value">{loading ? '…' : counts[resource.path] ?? '—'}</div>
            <span className="stat-link">Ver registros <span aria-hidden="true">↗</span></span>
          </Link>
        ))}
      </section>

      <section className="panel recent-panel">
        <div className="panel-heading">
          <div><h2>Usuários recentes</h2><p>Lista carregada a partir do backend.</p></div>
          <Link className="button button-secondary" to="/app/usuarios">Ver usuários</Link>
        </div>
        {loading ? (
          <div className="empty-state"><span className="spinner" /> Carregando dados...</div>
        ) : recentUsers.length === 0 ? (
          <div className="empty-state">{apiError ? 'Não foi possível consultar os usuários.' : 'Nenhum usuário cadastrado ainda.'}</div>
        ) : (
          <div className="recent-list">
            {recentUsers.map((user, index) => (
              <div className="recent-row" key={String(user.idUsuario ?? index)}>
                <span className="avatar">{String(user.nome ?? '?').slice(0, 1).toUpperCase()}</span>
                <span className="recent-user"><strong>{String(user.nome ?? 'Sem nome')}</strong><small>{String(user.email ?? '')}</small></span>
                <span className="status-tag">Ativo</span>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  )
}
