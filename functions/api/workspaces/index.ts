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

export const onRequest: PagesFunction = async ({ request, env }) => {
  const method = request.method.toUpperCase()

  if (method === 'GET') {
    const result = await env.DB.prepare(
      `SELECT id, name, slug, owner_name, owner_email, package, status, created_at
       FROM workspaces
       ORDER BY created_at DESC`,
    ).all<WorkspaceRow>()

    return sendJson({
      workspaces: result.results.map(mapRow),
    })
  }

  if (method === 'POST') {
    try {
      const payload = (await request.json().catch(() => null)) as WorkspacePayload | null

      if (!payload || typeof payload !== 'object') {
        return sendJson({ error: 'Payload tidak valid.' }, { status: 400 })
      }

      const { name, slug, familyAdmin, email, paket, status } = normalizeForm(payload)

      const existing = await env.DB.prepare('SELECT id FROM workspaces WHERE slug = ?').bind(slug).first<string>()
      if (existing) {
        return sendJson({ error: 'Slug sudah digunakan.' }, { status: 409 })
      }

      const id = crypto.randomUUID()
      const createdAt = new Date().toISOString()

      await env.DB.prepare(
        `INSERT INTO workspaces (id, name, slug, owner_name, owner_email, package, status, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      )
        .bind(id, name, slug, familyAdmin, email, paket, status, createdAt)
        .run()

      const created = await env.DB.prepare(
        `SELECT id, name, slug, owner_name, owner_email, package, status, created_at
         FROM workspaces
         WHERE id = ?`,
      )
        .bind(id)
        .first<WorkspaceRow>()

      return sendJson({ workspace: mapRow(created as WorkspaceRow) }, { status: 201 })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Terjadi kesalahan.'
      return sendJson({ error: message }, { status: 400 })
    }
  }

  return sendJson({ error: 'Method not allowed.' }, { status: 405 })
}
