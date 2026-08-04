import type { Person, PersonForm } from '../types'

type PersonRecord = {
  id: string
  workspace_id: string
  full_name: string
  gender: string
  birth_date: string | null
  death_date: string | null
  living_status: string
  photo_url: string | null
  created_at: string | null
}

function mapPerson(record: PersonRecord): Person {
  return {
    id: record.id,
    workspaceId: record.workspace_id,
    fullName: record.full_name,
    gender: record.gender,
    birthDate: record.birth_date,
    deathDate: record.death_date,
    livingStatus: record.living_status,
    photoUrl: record.photo_url,
    createdAt: record.created_at,
  }
}

async function readResponse<T>(response: Response): Promise<T> {
  const payload = (await response.json().catch(() => null)) as T | null

  if (!response.ok) {
    const message = payload && typeof payload === 'object' && 'error' in payload && typeof payload.error === 'string'
      ? payload.error
      : 'Request failed.'

    throw new Error(message)
  }

  return payload as T
}

export async function getPersons(workspaceId: string): Promise<Person[]> {
  const response = await fetch(`/api/persons?workspaceId=${encodeURIComponent(workspaceId)}`)
  const payload = await readResponse<{ persons: PersonRecord[] }>(response)
  return payload.persons.map(mapPerson)
}

export async function createPerson(workspaceId: string, form: PersonForm): Promise<Person> {
  const response = await fetch('/api/persons', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      workspaceId,
      fullName: form.fullName,
      gender: form.gender,
      birthDate: form.birthDate || null,
      deathDate: form.deathDate || null,
      livingStatus: form.livingStatus,
      photoUrl: form.photoUrl || null,
    }),
  })

  const payload = await readResponse<{ person: PersonRecord }>(response)
  return mapPerson(payload.person)
}

export async function updatePerson(id: string, form: PersonForm): Promise<Person> {
  const response = await fetch(`/api/persons/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fullName: form.fullName,
      gender: form.gender,
      birthDate: form.birthDate || null,
      deathDate: form.deathDate || null,
      livingStatus: form.livingStatus,
      photoUrl: form.photoUrl || null,
    }),
  })

  const payload = await readResponse<{ person: PersonRecord }>(response)
  return mapPerson(payload.person)
}

export async function deletePerson(id: string): Promise<void> {
  const response = await fetch(`/api/persons/${id}`, {
    method: 'DELETE',
  })

  await readResponse<{ ok: true }>(response)
}
