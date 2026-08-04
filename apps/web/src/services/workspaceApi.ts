import type { PackageOption, Workspace, WorkspaceForm } from '../features/platform/types'

type WorkspaceRecord = {
  id: string
  name: string
  slug: string
  owner_name: string | null
  owner_email: string | null
  package: string | null
  status: string | null
  created_at: string | null
}

function mapWorkspace(record: WorkspaceRecord): Workspace {
  return {
    id: record.id,
    namaKeluarga: record.name,
    slug: record.slug,
    familyAdmin: record.owner_name ?? '',
    email: record.owner_email ?? '',
    paket: (record.package as PackageOption) ?? 'Premium',
    status: (record.status as Workspace['status']) ?? 'Aktif',
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

export async function getWorkspaces(): Promise<Workspace[]> {
  const response = await fetch('/api/workspaces')
  const payload = await readResponse<{ workspaces: WorkspaceRecord[] }>(response)
  return payload.workspaces.map(mapWorkspace)
}

export async function createWorkspace(form: WorkspaceForm): Promise<Workspace> {
  const response = await fetch('/api/workspaces', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      namaKeluarga: form.namaKeluarga,
      slug: form.slug,
      familyAdmin: form.familyAdmin,
      email: form.email,
      paket: form.paket,
      status: 'Aktif',
    }),
  })

  const payload = await readResponse<{ workspace: WorkspaceRecord }>(response)
  return mapWorkspace(payload.workspace)
}

export async function updateWorkspace(id: string, form: WorkspaceForm): Promise<Workspace> {
  const response = await fetch(`/api/workspaces/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      namaKeluarga: form.namaKeluarga,
      slug: form.slug,
      familyAdmin: form.familyAdmin,
      email: form.email,
      paket: form.paket,
      status: 'Aktif',
    }),
  })

  const payload = await readResponse<{ workspace: WorkspaceRecord }>(response)
  return mapWorkspace(payload.workspace)
}

export async function deleteWorkspace(id: string): Promise<void> {
  const response = await fetch(`/api/workspaces/${id}`, {
    method: 'DELETE',
  })

  await readResponse<{ ok: true }>(response)
}
