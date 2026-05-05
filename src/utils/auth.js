const LOCAL_KEY = 'shachiAdminHash';

export async function sha256(message) {
  const data = new TextEncoder().encode(message);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Fetches hash from the deployed repo file first; falls back to localStorage.
// Returns null if no password has been set anywhere.
export async function getPasswordHash() {
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}adminConfig.json?_=${Date.now()}`);
    if (res.ok) {
      const data = await res.json();
      if (data.passwordHash) return data.passwordHash;
    }
  } catch {}
  return localStorage.getItem(LOCAL_KEY) || null;
}

// Returns the locally stored hash (used when building the deploy payload).
export function getLocalHash() {
  return localStorage.getItem(LOCAL_KEY) || null;
}

// Hashes and saves to localStorage. Returns the hash so it can be included in a deploy.
export async function setPassword(password) {
  const hash = await sha256(password);
  localStorage.setItem(LOCAL_KEY, hash);
  return hash;
}

export async function checkPassword(password) {
  const stored = await getPasswordHash();
  if (!stored) return false;
  const hash = await sha256(password);
  return hash === stored;
}
