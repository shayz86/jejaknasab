type PersonPayload = {
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
  const fullName = String(payload.fullName ?? '').trim()
  const gender = String(payload.gender ?? '').trim()
  const birthDate = payload.birthDate ?? null
  const deathDate = payload.deathDate ?? null
  const livingStatus = String(payload.livingStatus ?? 'Hidup').trim()
  const photoUrl = payload.photoUrl ?? null

  if (!fullName || !gender || !livingStatus) {
    throw new Error('Nama lengkap, gender, dan status hidup wajib diisi.')
  }

  return { fullName, gender, birthDate, deathDate, livingStatus, photoUrl }
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

export const onRequest: PagesFunction = async ({ request, env, params }) => {
  const id = params?.id?.toString()

  if (!id) {
    return sendJson({ error: 'Person id wajib ada.' }, { status: 400 })
  }

  const existing = await env.DB.prepare(
    `SELECT id, workspace_id, full_name, gender, birth_date, death_date, living_status, photo_url, created_at
     FROM persons
     WHERE id = ?`,
  )
    .bind(id)
    .first<PersonRow>()

  if (!existing) {
    return sendJson({ error: 'Person tidak ditemukan.' }, { status: 404 })
  }

  if (request.method.toUpperCase() === 'PUT') {
    try {
      const payload = (await request.json().catch(() => null)) as PersonPayload | null
      if (!payload || typeof payload !== 'object') {
        return sendJson({ error: 'Payload tidak valid.' }, { status: 400 })
      }

      const { fullName, gender, birthDate, deathDate, livingStatus, photoUrl } = normalizeForm(payload)

      await env.DB.prepare(
        `UPDATE persons
         SET full_name = ?, gender = ?, birth_date = ?, death_date = ?, living_status = ?, photo_url = ?
         WHERE id = ?`,
      )
        .bind(fullName, gender, birthDate, deathDate, livingStatus, photoUrl, id)
        .run()

      const updated = await env.DB.prepare(
        `SELECT id, workspace_id, full_name, gender, birth_date, death_date, living_status, photo_url, created_at
         FROM persons
         WHERE id = ?`,
      )
        .bind(id)
        .first<PersonRow>()

      return sendJson({ person: mapRow(updated as PersonRow) })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Terjadi kesalahan.'
      return sendJson({ error: message }, { status: 400 })
    }
  }

  if (request.method.toUpperCase() === 'DELETE') {
    await env.DB.prepare('DELETE FROM persons WHERE id = ?').bind(id).run()
    return sendJson({ ok: true }, { status: 200 })
  }

  return sendJson({ error: 'Method not allowed.' }, { status: 405 })
}
