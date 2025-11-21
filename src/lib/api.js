const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export async function fetchResources(params = {}) {
  const url = new URL(`${API_BASE}/api/resources`)
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, v)
  })
  const res = await fetch(url.toString())
  if (!res.ok) throw new Error('Failed to fetch resources')
  return res.json()
}

export async function fetchResource(id) {
  const res = await fetch(`${API_BASE}/api/resources/${id}`)
  if (!res.ok) throw new Error('Not found')
  return res.json()
}

export async function createResource(payload) {
  const res = await fetch(`${API_BASE}/api/resources`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error('Failed to create resource')
  return res.json()
}

export async function likeResource(id) {
  const res = await fetch(`${API_BASE}/api/resources/${id}/like`, { method: 'POST' })
  if (!res.ok) throw new Error('Failed to like')
  return res.json()
}

export function getApiBase() {
  return API_BASE
}
