export type PackageOption = 'Premium' | 'Ultimate'

export type Workspace = {
  id: number
  namaKeluarga: string
  slug: string
  familyAdmin: string
  email: string
  paket: PackageOption
  status: 'Aktif'
}

export type WorkspaceForm = {
  namaKeluarga: string
  slug: string
  familyAdmin: string
  email: string
  paket: PackageOption | ''
}

export type ErrorMap = Partial<Record<keyof WorkspaceForm, string>>
