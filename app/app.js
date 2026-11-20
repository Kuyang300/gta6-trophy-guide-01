// Boots the Leonida trophy guide: loads the list, wires the tracker controls,
// and keeps the checklist, roadmap and guide pane in sync with saved progress.
import { loadTrophies, kindLabel } from './data.js';
import { loadEarned, saveEarned, clearEarned, downloadProgress, readProgressFile } from './store.js';
import { applyFilters, countByKind } from './filters.js';
import { renderRoadmap } from './roadmap.js';
import { renderChecklist, renderDetail } from './views.js';

const state = { query: '', kind: 'all', grade: 'all', earnedOnly: false, spoilers: false };
let trophies = [];
let earned = loadEarned();
let selectedName = null;

const $ = (id) => document.getElementById(id);

function refresh() {
  const shown = applyFilters(trophies, state, earned);
  renderChecklist($('trophyList'), shown, state, earned, selectedName,
    (name, checked) => {
      if (checked) earned.add(name);
      else earned.delete(name);
      saveEarned(earned);
      refresh();
    },
    (name) => {
      selectedName = name;
      refresh();
    });
  const selected = trophies.find((t) => t.name === selectedName) ?? null;
  renderDetail($('detail'), selected, state, earned);
  renderRoadmap($('stages'), trophies, earned);
  $('earnedCount').textContent = earned.size;
  $('progressText').textContent = `${earned.size} of ${trophies.length} earned · Platinum ${Math.round((earned.size / trophies.length) * 100)}% there`;
  $('progressBar').style.width = `${(earned.size / trophies.length) * 100}%`;
  const counts = countByKind(trophies, earned);
  $('kindCounts').textContent = Object.entries(counts)
    .map(([kind, c]) => `${kindLabel(kind)} ${c.earned}/${c.total}`)
    .join(' · ');
  $('listCount').textContent = `${shown.length} of ${trophies.length} trophies shown`;
  $('emptyState').hidden = shown.length > 0;
}

function wireControls() {
  $('search').addEventListener('input', (e) => { state.query = e.target.value; refresh(); });
  $('kindFilter').addEventListener('change', (e) => { state.kind = e.target.value; refresh(); });
  $('gradeFilter').addEventListener('change', (e) => { state.grade = e.target.value; refresh(); });
  $('earnedOnly').addEventListener('change', (e) => { state.earnedOnly = e.target.checked; refresh(); });
  $('spoilerToggle').addEventListener('change', (e) => { state.spoilers = e.target.checked; refresh(); });
  $('exportBtn').addEventListener('click', () => downloadProgress(earned));
  $('importFile').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      earned = await readProgressFile(file, trophies.map((t) => t.name));
      saveEarned(earned);
    } catch {
      alert('That file is not a trophy progress export.');
    }
    e.target.value = '';
    refresh();
  });
  $('resetBtn').addEventListener('click', () => {
    if (confirm('Clear all earned trophies?')) {
      earned = new Set();
      clearEarned();
      selectedName = null;
      refresh();
    }
  });
}

trophies = await loadTrophies();
wireControls();
refresh();
