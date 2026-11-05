export type EntityRecord = Record<string, unknown>

const API_BASE_URL = (import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api')
  .replace(/\/+$/, '')

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: {
        ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
        ...init?.headers,
      },
    })
  } catch {
    throw new Error(
      `Não foi possível conectar à API (${API_BASE_URL}). Confirme se o backend está em execução.`,
    )
  }

  if (!response.ok) {
    const body = await response.text()
    let message = body || `Erro na API (${response.status})`
    try {
      const problem = JSON.parse(body) as { detail?: string; message?: string }
      message = problem.detail ?? problem.message ?? message
    } catch {
      // Respostas sem JSON usam o texto original da API.
    }
    throw new Error(message)
  }

  if (response.status === 204) return undefined as T
  return response.json() as Promise<T>
}

export const api = {
  list: (resource: string) => request<EntityRecord[]>(`/${resource}`),
  create: (resource: string, data: EntityRecord) =>
    request<EntityRecord>(`/${resource}`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (resource: string, id: string | number, data: EntityRecord) =>
    request<EntityRecord>(`/${resource}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  remove: (resource: string, id: string | number) =>
    request<void>(`/${resource}/${id}`, { method: 'DELETE' }),
}

export function getValue(record: EntityRecord, path: string): unknown {
  return path.split('.').reduce<unknown>((value, key) => {
    if (value && typeof value === 'object') {
      return (value as Record<string, unknown>)[key]
    }
    return undefined
  }, record)
}

export function toPayload(
  values: Record<string, string>,
  fields: Array<{ name: string; type: string }>,
): EntityRecord {
  const payload: EntityRecord = {}
  for (const field of fields) {
    const value = values[field.name]?.trim() ?? ''
    if (!value) continue

    const converted: unknown =
      field.type === 'number' ? Number(value) : value
    const parts = field.name.split('.')
    let target = payload
    for (const part of parts.slice(0, -1)) {
      const nested = target[part]
      if (!nested || typeof nested !== 'object') {
        target[part] = {}
      }
      target = target[part] as EntityRecord
    }
    target[parts[parts.length - 1]] = converted
  }
  return payload
}
