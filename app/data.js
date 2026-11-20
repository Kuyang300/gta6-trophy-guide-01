// Loads the trophy list for the Leonida guide. The file lives under app/,
// so this fetch never leaves the app's own server and the guide works offline.
export async function loadTrophies() {
  const response = await fetch('data/trophies.json');
  if (!response.ok) throw new Error('trophy list failed to load');
  const doc = await response.json();
  return doc.trophies;
}

export function gradeLabel(grade) {
  return grade.charAt(0).toUpperCase() + grade.slice(1);
}

export function kindLabel(kind) {
  const labels = {
    story: 'Story',
    side: 'Side strand',
    collectibles: 'Collectibles',
    activities: 'Activities',
    money: 'Money',
    completion: 'Completion',
    misc: 'Everything else',
    online: 'Online',
  };
  return labels[kind] ?? kind;
}
