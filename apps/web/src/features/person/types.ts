export type Person = {
  id: string
  workspaceId: string
  fullName: string
  gender: string
  birthDate: string | null
  deathDate: string | null
  livingStatus: string
  photoUrl: string | null
  createdAt: string | null
}

export type PersonForm = {
  fullName: string
  gender: string
  birthDate: string
  deathDate: string
  livingStatus: string
  photoUrl: string
}

export type PersonErrorMap = Partial<Record<keyof PersonForm, string>>
