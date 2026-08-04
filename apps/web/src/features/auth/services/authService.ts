import type { AuthForm, AuthUser, UserRole } from '../types'

const USERS_KEY = 'jejaknasab-users'
const SESSION_KEY = 'jejaknasab-session'

const defaultOwner: AuthUser = {
  id: 'owner-seed',
  fullName: 'JejakNasab Owner',
  email: 'owner@jejaknasab.dev',
  password: 'owner123',
  role: 'owner',
  assignedWorkspaceSlug: 'demo-workspace',
  familyName: 'JejakNasab Demo',
  packageName: 'Ultimate',
  createdAt: new Date().toISOString(),
}

function readUsers(): AuthUser[] {
  if (typeof window === 'undefined') {
    return []
  }

  const saved = window.localStorage.getItem(USERS_KEY)
  const parsed = saved ? (JSON.parse(saved) as AuthUser[]) : []
  return parsed
}

function writeUsers(users: AuthUser[]) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function ensureSeedOwner() {
  const users = readUsers()
  if (users.some((user) => user.email === defaultOwner.email)) {
    return
  }

  writeUsers([defaultOwner, ...users])
}

export function getSession(): AuthUser | null {
  if (typeof window === 'undefined') {
    return null
  }

  const saved = window.localStorage.getItem(SESSION_KEY)
  return saved ? (JSON.parse(saved) as AuthUser) : null
}

export function setSession(user: AuthUser) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(SESSION_KEY, JSON.stringify(user))
}

export function clearSession() {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.removeItem(SESSION_KEY)
}

export function registerUser(form: AuthForm) {
  ensureSeedOwner()

  const users = readUsers()
  const existing = users.find((user) => user.email.toLowerCase() === form.email.toLowerCase())
  if (existing) {
    throw new Error('Email sudah terdaftar.')
  }

  if (form.password !== form.confirmPassword) {
    throw new Error('Konfirmasi password tidak cocok.')
  }

  const nextUser: AuthUser = {
    id: crypto.randomUUID(),
    fullName: form.fullName.trim(),
    email: form.email.trim().toLowerCase(),
    password: form.password,
    role: 'family_admin',
    assignedWorkspaceSlug: form.assignedWorkspaceSlug.trim().toLowerCase(),
    familyName: form.familyName.trim(),
    packageName: form.packageName === 'Ultimate' ? 'Ultimate' : 'Premium',
    createdAt: new Date().toISOString(),
  }

  writeUsers([nextUser, ...users])
  setSession(nextUser)
  return nextUser
}

export function loginUser(email: string, password: string): AuthUser {
  ensureSeedOwner()

  const users = readUsers()
  const matched = users.find(
    (user) => user.email.toLowerCase() === email.trim().toLowerCase() && user.password === password,
  )

  if (!matched) {
    throw new Error('Email atau password tidak valid.')
  }

  setSession(matched)
  return matched
}

export function getRoleRedirect(role: UserRole, assignedWorkspaceSlug: string) {
  if (role === 'owner') {
    return '/owner'
  }

  return assignedWorkspaceSlug ? '/app' : '/'
}
