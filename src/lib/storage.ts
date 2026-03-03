/**
 * ThủTụcJP — Encrypted Local Storage
 * 
 * Dữ liệu được mã hóa bằng AES-256-GCM (Web Crypto API)
 * với password do user đặt → export ra file .thutuc
 * Không gửi lên server, không lưu password.
 */

const ALGO = 'AES-GCM'
const SALT_LEN = 16
const IV_LEN = 12
const ITERATIONS = 100_000

// Derive key from password using PBKDF2
async function deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
  const enc = new TextEncoder()
  const keyMaterial = await crypto.subtle.importKey(
    'raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']
  )
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: ITERATIONS, hash: 'SHA-256' },
    keyMaterial,
    { name: ALGO, length: 256 },
    false,
    ['encrypt', 'decrypt']
  )
}

// Encrypt data → binary (salt + iv + ciphertext)
async function encrypt(data: string, password: string): Promise<ArrayBuffer> {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_LEN))
  const iv = crypto.getRandomValues(new Uint8Array(IV_LEN))
  const key = await deriveKey(password, salt)
  const enc = new TextEncoder()
  const ciphertext = await crypto.subtle.encrypt(
    { name: ALGO, iv },
    key,
    enc.encode(data)
  )
  // Combine: salt(16) + iv(12) + ciphertext
  const result = new Uint8Array(SALT_LEN + IV_LEN + ciphertext.byteLength)
  result.set(salt, 0)
  result.set(iv, SALT_LEN)
  result.set(new Uint8Array(ciphertext), SALT_LEN + IV_LEN)
  return result.buffer
}

// Decrypt binary → data
async function decrypt(buffer: ArrayBuffer, password: string): Promise<string> {
  const data = new Uint8Array(buffer)
  const salt = data.slice(0, SALT_LEN)
  const iv = data.slice(SALT_LEN, SALT_LEN + IV_LEN)
  const ciphertext = data.slice(SALT_LEN + IV_LEN)
  const key = await deriveKey(password, salt)
  const decrypted = await crypto.subtle.decrypt(
    { name: ALGO, iv },
    key,
    ciphertext
  )
  return new TextDecoder().decode(decrypted)
}

// ===== Public API =====

export interface SavedProfile {
  version: 1
  name: string
  createdAt: string
  updatedAt: string
  forms: Record<string, Record<string, string>> // formId → field values
}

// Export profile to encrypted .thutuc file
export async function exportProfile(
  profile: SavedProfile,
  password: string,
  fileName?: string
): Promise<void> {
  const json = JSON.stringify(profile)
  const encrypted = await encrypt(json, password)
  const blob = new Blob([encrypted], { type: 'application/octet-stream' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = fileName || `thutucjp-${profile.name || 'data'}.thutuc`
  a.click()
  URL.revokeObjectURL(url)
}

// Import profile from encrypted .thutuc file
export async function importProfile(
  file: File,
  password: string
): Promise<SavedProfile> {
  const buffer = await file.arrayBuffer()
  try {
    const json = await decrypt(buffer, password)
    const profile = JSON.parse(json) as SavedProfile
    if (profile.version !== 1) throw new Error('Phiên bản file không hỗ trợ')
    return profile
  } catch {
    throw new Error('Sai mật khẩu hoặc file bị hỏng')
  }
}

// ===== LocalStorage (optional, unencrypted session cache) =====

const LS_KEY = 'thutucjp_draft'

export function saveDraft(formId: string, data: Record<string, string>) {
  try {
    const drafts = JSON.parse(localStorage.getItem(LS_KEY) || '{}')
    drafts[formId] = { data, savedAt: new Date().toISOString() }
    localStorage.setItem(LS_KEY, JSON.stringify(drafts))
  } catch { /* quota exceeded, ignore */ }
}

export function loadDraft(formId: string): Record<string, string> | null {
  try {
    const drafts = JSON.parse(localStorage.getItem(LS_KEY) || '{}')
    return drafts[formId]?.data || null
  } catch { return null }
}

export function clearDraft(formId: string) {
  try {
    const drafts = JSON.parse(localStorage.getItem(LS_KEY) || '{}')
    delete drafts[formId]
    localStorage.setItem(LS_KEY, JSON.stringify(drafts))
  } catch { /* ignore */ }
}

export function getAllDrafts(): Record<string, { data: Record<string, string>; savedAt: string }> {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || '{}')
  } catch { return {} }
}
