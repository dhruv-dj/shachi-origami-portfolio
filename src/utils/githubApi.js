const API = 'https://api.github.com';

async function request(token, method, path, body) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/vnd.github+json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || `GitHub API error ${res.status}`);
  return data;
}

async function getFileSha(token, owner, repo, path) {
  try {
    const data = await request(token, 'GET', `/repos/${owner}/${repo}/contents/${path}`);
    return data.sha;
  } catch {
    return null;
  }
}

function toBase64(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

export async function putFile(token, owner, repo, path, content, message) {
  const sha = await getFileSha(token, owner, repo, path);
  const body = { message, content: toBase64(content), branch: 'main' };
  if (sha) body.sha = sha;
  return request(token, 'PUT', `/repos/${owner}/${repo}/contents/${path}`, body);
}

export async function deployContent(token, owner, repo, content) {
  const json = JSON.stringify(content, null, 2);
  await putFile(token, owner, repo, 'public/siteContent.json', json, 'Update site content via admin panel');
}
