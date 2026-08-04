export type UserRole = 'owner' | 'family_admin' | 'member'

export type AuthUser = {
  id: string
  fullName: string
  email: string
  password: string
  role: UserRole
  assignedWorkspaceSlug: string
  familyName: string
  packageName: 'Premium' | 'Ultimate'
  createdAt: string
}

export type AuthForm = {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  familyName: string
  assignedWorkspaceSlug: string
  packageName: 'Premium' | 'Ultimate' | ''
}
