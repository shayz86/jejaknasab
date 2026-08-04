export type UserRole = 'owner' | 'family_admin' | 'member'

export type AuthUser = {
  id: string
  fullName: string
  email: string
  password: string
  role: UserRole
  assignedWorkspaceSlug: string
  createdAt: string
}

export type AuthForm = {
  fullName: string
  email: string
  password: string
  role: UserRole
  assignedWorkspaceSlug: string
}
