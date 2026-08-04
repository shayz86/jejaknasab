type WorkspacePayload = {
  namaKeluarga?: string
  slug?: string
  familyAdmin?: string
  email?: string
  paket?: string
  status?: string
}

type WorkspaceRow = {
  id: string
  name: string
  slug: string
  owner_name: string | null
  owner_email: string | null
  package: string | null
  status: string | null
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

function normalizeForm(payload: WorkspacePayload) {
  const name = String(payload.namaKeluarga ?? '').trim()
  const slug = String(payload.slug ?? '').trim().toLowerCase()
  const familyAdmin = String(payload.familyAdmin ?? '').trim()
  const email = String(payload.email ?? '').trim()
  const paket = String(payload.paket ?? '').trim()
  const status = String(payload.status ?? 'Aktif').trim()

  if (!name || !slug || !familyAdmin || !email || !paket) {
    throw new Error('Semua field wajib diisi.')
  }

  if (!/^[a-z0-9-]+$/.test(slug)) {
    throw new Error('Slug hanya boleh berisi huruf kecil, angka, dan dash.')
  }

  return { name, slug, familyAdmin, email, paket, status }
}

function mapRow(row: WorkspaceRow) {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    owner_name: row.owner_name,
    owner_email: row.owner_email,
    package: row.package,
    status: row.status,
    created_at: row.created_at,
  }
}

export const onRequest: PagesFunction = async ({ request, env, params }) => {
  const id = params?.id?.toString()

  if (!id) {
    return sendJson({ error: 'Workspace id wajib ada.' }, { status: 400 })
  }

  const existing = await env.DB.prepare(
    `SELECT id, name, slug, owner_name, owner_email, package, status, created_at
     FROM workspaces
     WHERE id = ?`,
  )
    .bind(id)
    .first<WorkspaceRow>()

  if (!existing) {
    return sendJson({ error: 'Workspace tidak ditemukan.' }, { status: 404 })
  }

  if (request.method.toUpperCase() === 'PUT') {
    try {
      const payload = (await request.json().catch(() => null)) as WorkspacePayload | null

      if (!payload || typeof payload !== 'object') {
        return sendJson({ error: 'Payload tidak valid.' }, { status: 400 })
      }

      const { name, slug, familyAdmin, email, paket, status } = normalizeForm(payload)

      const slugConflict = await env.DB.prepare('SELECT id FROM workspaces WHERE slug = ? AND id != ?').bind(slug, id).first<string>()
      if (slugConflict) {
        return sendJson({ error: 'Slug sudah digunakan.' }, { status: 409 })
      }

      await env.DB.prepare(
        `UPDATE workspaces
         SET name = ?, slug = ?, owner_name = ?, owner_email = ?, package = ?, status = ?
         WHERE id = ?`,
      )
        .bind(name, slug, familyAdmin, email, paket, status, id)
        .run()

      const updated = await env.DB.prepare(
        `SELECT id, name, slug, owner_name, owner_email, package, status, created_at
         FROM workspaces
         WHERE id = ?`,
      )
        .bind(id)
        .first<WorkspaceRow>()

      return sendJson({ workspace: mapRow(updated as WorkspaceRow) })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Terjadi kesalahan.'
      return sendJson({ error: message }, { status: 400 })
    }
  }

  if (request.method.toUpperCase() === 'DELETE') {
    await env.DB.prepare('DELETE FROM workspaces WHERE id = ?').bind(id).run()
    return sendJson({ ok: true }, { status: 200 })
  }

  return sendJson({ error: 'Method not allowed.' }, { status: 405 })
}
