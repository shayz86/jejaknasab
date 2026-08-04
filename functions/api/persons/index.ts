type PersonPayload = {
  workspaceId?: string
  fullName?: string
  gender?: string
  birthDate?: string | null
  deathDate?: string | null
  livingStatus?: string
  photoUrl?: string | null
}

type PersonRow = {
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

function sendJson(body: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  })
}

function normalizeForm(payload: PersonPayload) {
  const workspaceId = String(payload.workspaceId ?? '').trim()
  const fullName = String(payload.fullName ?? '').trim()
  const gender = String(payload.gender ?? '').trim()
  const birthDate = payload.birthDate ?? null
  const deathDate = payload.deathDate ?? null
  const livingStatus = String(payload.livingStatus ?? 'Hidup').trim()
  const photoUrl = payload.photoUrl ?? null

  if (!workspaceId || !fullName || !gender || !livingStatus) {
    throw new Error('Workspace, nama lengkap, gender, dan status hidup wajib diisi.')
  }

  return { workspaceId, fullName, gender, birthDate, deathDate, livingStatus, photoUrl }
}

function mapRow(row: PersonRow) {
  return {
    id: row.id,
    workspace_id: row.workspace_id,
    full_name: row.full_name,
    gender: row.gender,
    birth_date: row.birth_date,
    death_date: row.death_date,
    living_status: row.living_status,
    photo_url: row.photo_url,
    created_at: row.created_at,
  }
}

export const onRequest: PagesFunction = async ({ request, env, url }) => {
  const method = request.method.toUpperCase()
  const workspaceId = url.searchParams.get('workspaceId')

  if (method === 'GET') {
    if (!workspaceId) {
      return sendJson({ error: 'workspaceId wajib ada.' }, { status: 400 })
    }

    const result = await env.DB.prepare(
      `SELECT id, workspace_id, full_name, gender, birth_date, death_date, living_status, photo_url, created_at
       FROM persons
       WHERE workspace_id = ?
       ORDER BY created_at DESC`,
    )
      .bind(workspaceId)
      .all<PersonRow>()

    return sendJson({ persons: result.results.map(mapRow) })
  }

  if (method === 'POST') {
    try {
      const payload = (await request.json().catch(() => null)) as PersonPayload | null
      if (!payload || typeof payload !== 'object') {
        return sendJson({ error: 'Payload tidak valid.' }, { status: 400 })
      }

      const { workspaceId, fullName, gender, birthDate, deathDate, livingStatus, photoUrl } = normalizeForm(payload)

      const workspace = await env.DB.prepare('SELECT id FROM workspaces WHERE id = ?').bind(workspaceId).first<string>()
      if (!workspace) {
        return sendJson({ error: 'Workspace tidak ditemukan.' }, { status: 404 })
      }

      const id = crypto.randomUUID()
      const createdAt = new Date().toISOString()

      await env.DB.prepare(
        `INSERT INTO persons (id, workspace_id, full_name, gender, birth_date, death_date, living_status, photo_url, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
        .bind(id, workspaceId, fullName, gender, birthDate, deathDate, livingStatus, photoUrl, createdAt)
        .run()

      const created = await env.DB.prepare(
        `SELECT id, workspace_id, full_name, gender, birth_date, death_date, living_status, photo_url, created_at
         FROM persons
         WHERE id = ?`,
      )
        .bind(id)
        .first<PersonRow>()

      return sendJson({ person: mapRow(created as PersonRow) }, { status: 201 })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Terjadi kesalahan.'
      return sendJson({ error: message }, { status: 400 })
    }
  }

  return sendJson({ error: 'Method not allowed.' }, { status: 405 })
}
