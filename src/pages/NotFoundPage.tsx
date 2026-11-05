import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <main className="not-found-page">
      <span className="not-found-code">404</span>
      <p className="eyebrow">PÁGINA NÃO ENCONTRADA</p>
      <h1>Este caminho não existe.</h1>
      <p>O endereço pode ter mudado ou não está disponível.</p>
      <Link to="/app" className="button button-primary">Voltar ao início</Link>
    </main>
  )
}
