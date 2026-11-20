// Saved progress for the Leonida guide: a set of earned trophy names kept in
// localStorage, exportable to a file and importable back. Nothing leaves the browser.
const KEY = 'gta6-trophy-guide-v1';

export function loadEarned() {
  try {
    const raw = localStorage.getItem(KEY);
    const names = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(names) ? names : []);
  } catch {
    return new Set();
  }
}

export function saveEarned(earned) {
  localStorage.setItem(KEY, JSON.stringify([...earned]));
}

export function clearEarned() {
  localStorage.removeItem(KEY);
}

export function downloadProgress(earned) {
  const payload = { app: 'leonida-trophy-guide', exportedAt: new Date().toISOString(), earned: [...earned] };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const anchor = document.createElement('a');
  anchor.href = URL.createObjectURL(blob);
  anchor.download = 'gta6-trophy-progress.json';
  anchor.click();
  URL.revokeObjectURL(anchor.href);
}

export async function readProgressFile(file, knownNames) {
  const text = await file.text();
  const doc = JSON.parse(text);
  const names = Array.isArray(doc) ? doc : doc.earned;
  if (!Array.isArray(names)) throw new Error('not a progress file');
  const known = new Set(knownNames);
  return new Set(names.filter((name) => known.has(name)));
}
