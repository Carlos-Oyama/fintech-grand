import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import { resources } from '../data/resources'

export function AppLayout() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <NavLink className="brand" to="/app" end>
          <span className="brand-mark">G</span>
          <span>grand<span className="brand-light">.</span></span>
        </NavLink>
        <p className="nav-caption">ESPAÇO DE TRABALHO</p>
        <nav className="main-nav" aria-label="Navegação principal">
          <NavLink to="/app" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <span aria-hidden="true">⌂</span> Visão geral
          </NavLink>
          <p className="nav-caption nav-caption-spaced">GERENCIAR</p>
          {resources.map((resource) => (
            <NavLink
              key={resource.path}
              to={`/app/${resource.path}`}
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              <span className="nav-icon" aria-hidden="true">{resource.title.slice(0, 1)}</span>
              {resource.title}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="profile-chip">
            <span className="avatar">D</span>
            <span><strong>Conta demo</strong><small>Workspace pessoal</small></span>
          </div>
          <button type="button" className="logout-button" onClick={handleLogout}>Sair</button>
        </div>
      </aside>
      <main className="main-area">
        <header className="topbar">
          <span>Painel financeiro</span>
          <span className="connection-indicator"><i /> API REST</span>
        </header>
        <div className="page-content"><Outlet /></div>
      </main>
    </div>
  )
}
