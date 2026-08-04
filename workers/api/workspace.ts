export interface Env {
  DB: D1Database
}

const jsonResponse = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  })

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname === '/api/workspaces' && request.method === 'GET') {
      const { results } = await env.DB.prepare('SELECT * FROM workspaces ORDER BY created_at DESC').all()
      return jsonResponse({ workspaces: results })
    }

    if (url.pathname === '/api/workspaces' && request.method === 'POST') {
      try {
        const body = (await request.json()) as {
          id?: string
          name?: string
          slug?: string
          owner_name?: string
          owner_email?: string
          package?: string
          status?: string
          created_at?: string
        }

        if (!body.name || !body.slug || !body.owner_name || !body.owner_email || !body.package || !body.status) {
          return jsonResponse({ error: 'All fields are required.' }, 400)
        }

        const id = body.id ?? crypto.randomUUID()
        const createdAt = body.created_at ?? new Date().toISOString()

        await env.DB.prepare(
          `
            INSERT INTO workspaces (id, name, slug, owner_name, owner_email, package, status, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          `,
        )
          .bind(id, body.name, body.slug, body.owner_name, body.owner_email, body.package, body.status, createdAt)
          .run()

        return jsonResponse(
          {
            message: 'Workspace created successfully.',
            workspace: {
              id,
              name: body.name,
              slug: body.slug,
              owner_name: body.owner_name,
              owner_email: body.owner_email,
              package: body.package,
              status: body.status,
              created_at: createdAt,
            },
          },
          201,
        )
      } catch {
        return jsonResponse({ error: 'Invalid request body.' }, 400)
      }
    }

    return jsonResponse({ error: 'Not found.' }, 404)
  },
}
