const STORAGE_KEY = 'shachiAdminHash';

export async function sha256(message) {
  const data = new TextEncoder().encode(message);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export function hasPassword() {
  return !!localStorage.getItem(STORAGE_KEY);
}

export async function setPassword(password) {
  const hash = await sha256(password);
  localStorage.setItem(STORAGE_KEY, hash);
}

export async function checkPassword(password) {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return false;
  const hash = await sha256(password);
  return hash === stored;
}
