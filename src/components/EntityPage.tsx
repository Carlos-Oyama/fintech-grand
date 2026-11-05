import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { api, getValue, toPayload } from '../api'
import type { EntityRecord } from '../api'
import type { ResourceConfig } from '../data/resources'

function displayValue(value: unknown) {
  if (value === null || value === undefined || value === '') return '—'
  if (typeof value === 'object') return '—'
  return String(value)
}

export function EntityPage({ resource }: { resource: ResourceConfig }) {
  const [items, setItems] = useState<EntityRecord[]>([])
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [refresh, setRefresh] = useState(0)
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<EntityRecord | null>(null)
  const [values, setValues] = useState<Record<string, string>>({})
  const [hasLoaded, setHasLoaded] = useState(false)
  const loading = !hasLoaded

  useEffect(() => {
    let active = true
    api.list(resource.path).then(
      (records) => {
        if (!active) return
        setItems(records)
        setHasLoaded(true)
      },
      (cause: unknown) => {
        if (!active) return
        setError(cause instanceof Error ? cause.message : 'Erro ao carregar registros.')
        setItems([])
        setHasLoaded(true)
      },
    )
    return () => { active = false }
  }, [resource.path, refresh])

  function openCreateForm() {
    setEditing(null)
    setValues({})
    setError('')
    setFormOpen(true)
  }

  function openEditForm(record: EntityRecord) {
    setEditing(record)
    setValues(Object.fromEntries(
      resource.fields.map((field) => {
        const value = getValue(record, field.name)
        return [field.name, value === null || value === undefined ? '' : String(value)]
      }),
    ))
    setError('')
    setFormOpen(true)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setError('')
    try {
      const payload = toPayload(values, resource.fields)
      const id = editing ? getValue(editing, resource.idField) : undefined
      if (id === undefined) {
        await api.create(resource.path, payload)
      } else {
        await api.update(resource.path, String(id), payload)
      }
      setFormOpen(false)
      setHasLoaded(false)
      setRefresh((current) => current + 1)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Erro ao salvar registro.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(record: EntityRecord) {
    const id = getValue(record, resource.idField)
    if (id === undefined || !window.confirm('Deseja realmente excluir este registro?')) return
    setError('')
    try {
      await api.remove(resource.path, String(id))
      setHasLoaded(false)
      setRefresh((current) => current + 1)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Erro ao excluir registro.')
    }
  }

  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">CADASTROS</p>
          <h1>{resource.title}</h1>
          <p className="page-description">{resource.description}</p>
        </div>
        <button className="button button-primary" type="button" onClick={openCreateForm}>
          <span aria-hidden="true">＋</span> Novo registro
        </button>
      </div>

      {error && <div className="alert alert-error" role="alert">{error}</div>}

      {formOpen && (
        <section className="panel form-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">{editing ? 'EDIÇÃO' : 'NOVO CADASTRO'}</p>
              <h2>{editing ? `Editar ${resource.title.toLowerCase()}` : `Adicionar ${resource.title.toLowerCase()}`}</h2>
            </div>
            <button type="button" className="icon-button" aria-label="Fechar formulário" onClick={() => setFormOpen(false)}>×</button>
          </div>
          <form className="entity-form" onSubmit={handleSubmit}>
            {resource.fields.map((field) => (
              <label className="field" key={field.name}>
                <span>{field.label}{field.required && <b> *</b>}</span>
                <input
                  type={field.type}
                  step={field.step}
                  required={field.required}
                  min={field.type === 'number' ? '0' : undefined}
                  value={values[field.name] ?? ''}
                  onChange={(event) => setValues((current) => ({
                    ...current,
                    [field.name]: event.target.value,
                  }))}
                />
              </label>
            ))}
            <div className="form-actions">
              <button type="button" className="button button-quiet" onClick={() => setFormOpen(false)}>Cancelar</button>
              <button type="submit" className="button button-primary" disabled={saving}>
                {saving ? 'Salvando...' : editing ? 'Salvar alterações' : 'Criar registro'}
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="panel table-panel">
        <div className="panel-heading table-heading">
          <div>
            <h2>Todos os registros</h2>
            <p>{loading ? 'Carregando dados da API...' : `${items.length} ${items.length === 1 ? 'registro encontrado' : 'registros encontrados'}`}</p>
          </div>
          <button type="button" className="button button-secondary" onClick={() => {
            setError('')
            setHasLoaded(false)
            setRefresh((current) => current + 1)
          }}>
            Atualizar
          </button>
        </div>
        {loading ? (
          <div className="empty-state"><span className="spinner" /> Carregando...</div>
        ) : items.length === 0 ? (
          <div className="empty-state">
            {error ? 'Não foi possível carregar os registros.' : 'Nenhum registro por aqui. Crie o primeiro para começar.'}
          </div>
        ) : (
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  {resource.columns.map((column) => <th key={column.name}>{column.label}</th>)}
                  <th><span className="sr-only">Ações</span></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={String(getValue(item, resource.idField) ?? index)}>
                    {resource.columns.map((column) => (
                      <td key={column.name}>{displayValue(getValue(item, column.name))}</td>
                    ))}
                    <td className="row-actions">
                      <button type="button" className="text-button" onClick={() => openEditForm(item)}>Editar</button>
                      <button type="button" className="text-button text-danger" onClick={() => void handleDelete(item)}>Excluir</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  )
}
