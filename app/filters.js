// Filters for the trophy checklist: kind, grade, text search, earned-only and
// the spoiler setting, which hides story trophies until they are earned.
export function applyFilters(trophies, state, earned) {
  const query = state.query.trim().toLowerCase();
  return trophies.filter((trophy) => {
    if (state.kind === 'missable' && !trophy.missable) return false;
    if (state.kind === 'online') return false;
    if (state.kind !== 'all' && state.kind !== 'missable' && trophy.kind !== state.kind) return false;
    if (state.grade !== 'all' && trophy.grade !== state.grade) return false;
    if (state.earnedOnly && !earned.has(trophy.name)) return false;
    if (query) {
      const haystack = [trophy.name, trophy.description, trophy.guide, trophy.kind].join(' ').toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });
}

export function isSpoilerHidden(trophy, state, earned) {
  return state.spoilers && trophy.kind === 'story' && !earned.has(trophy.name);
}

export function countByKind(trophies, earned) {
  const counts = {};
  for (const trophy of trophies) {
    counts[trophy.kind] = counts[trophy.kind] ?? { total: 0, earned: 0 };
    counts[trophy.kind].total += 1;
    if (earned.has(trophy.name)) counts[trophy.kind].earned += 1;
  }
  return counts;
}
