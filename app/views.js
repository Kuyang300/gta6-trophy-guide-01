// Renders the checklist rows and the guide detail pane for the Leonida guide.
import { gradeLabel, kindLabel } from './data.js';
import { isSpoilerHidden } from './filters.js';

export function renderChecklist(list, shown, state, earned, selectedName, onToggle, onSelect) {
  list.replaceChildren();
  for (const trophy of shown) {
    const item = document.createElement('li');
    if (earned.has(trophy.name)) item.classList.add('earned');
    if (trophy.name === selectedName) item.classList.add('selected');
    const box = document.createElement('input');
    box.type = 'checkbox';
    box.checked = earned.has(trophy.name);
    box.setAttribute('aria-label', `Earned: ${trophy.name}`);
    box.addEventListener('change', (event) => {
      event.stopPropagation();
      onToggle(trophy.name, box.checked);
    });
    const body = document.createElement('div');
    const name = document.createElement('div');
    name.className = 'trophy-name';
    const desc = document.createElement('div');
    desc.className = 'trophy-desc';
    if (isSpoilerHidden(trophy, state, earned)) {
      name.textContent = 'Hidden story trophy — earn it to reveal';
      desc.textContent = 'Spoiler-free mode is on. Tick it earned to see its name and description.';
      name.classList.add('spoiler-hidden');
    } else {
      name.textContent = trophy.name;
      desc.textContent = trophy.description;
    }
    const meta = document.createElement('div');
    meta.className = 'trophy-meta';
    const grade = document.createElement('span');
    grade.className = `grade grade-${trophy.grade}`;
    grade.textContent = gradeLabel(trophy.grade);
    meta.append(grade, document.createTextNode(` ${kindLabel(trophy.kind)}`));
    if (trophy.missable) {
      const flag = document.createElement('span');
      flag.className = 'flag';
      flag.textContent = ' · Missable — do it in Chapter 1';
      meta.append(flag);
    }
    if (trophy.count) {
      meta.append(document.createTextNode(` · PSN tracks ${trophy.count}`));
    }
    body.append(name, desc, meta);
    item.append(box, body);
    item.addEventListener('click', () => onSelect(trophy.name));
    list.append(item);
  }
}

export function renderDetail(panel, trophy, state, earned) {
  panel.replaceChildren();
  if (!trophy) {
    const heading = document.createElement('h2');
    heading.textContent = 'Pick a trophy';
    const text = document.createElement('p');
    text.textContent = 'Select any trophy in the checklist to see its official description, the guide, its steps and its sources here.';
    panel.append(heading, text);
    return;
  }
  const heading = document.createElement('h2');
  const desc = document.createElement('p');
  desc.className = 'trophy-desc';
  if (isSpoilerHidden(trophy, state, earned)) {
    heading.textContent = 'Hidden story trophy';
    desc.textContent = 'Spoiler-free mode is on. Earn this trophy to reveal its name, description and guide.';
    panel.append(heading, desc);
    return;
  }
  heading.textContent = trophy.name;
  desc.textContent = `Official: ${trophy.description}`;
  const meta = document.createElement('p');
  meta.className = 'trophy-meta';
  const grade = document.createElement('span');
  grade.className = `grade grade-${trophy.grade}`;
  grade.textContent = gradeLabel(trophy.grade);
  meta.append(grade, document.createTextNode(` ${kindLabel(trophy.kind)} · Roadmap stage ${trophy.stage}`));
  if (trophy.missable) {
    const flag = document.createElement('span');
    flag.className = 'flag';
    flag.textContent = ' · Missable — Chapter 1 only';
    meta.append(flag);
  }
  const guideHeading = document.createElement('h3');
  guideHeading.textContent = 'Guide';
  const guide = document.createElement('p');
  guide.textContent = trophy.guide;
  const stepsHeading = document.createElement('h3');
  stepsHeading.textContent = 'Steps';
  const steps = document.createElement('ol');
  for (const step of trophy.steps ?? []) {
    const li = document.createElement('li');
    li.textContent = step;
    steps.append(li);
  }
  const sourcesHeading = document.createElement('h3');
  sourcesHeading.textContent = 'Sources';
  const sources = document.createElement('p');
  sources.className = 'sources';
  (trophy.sources ?? []).forEach((source, index) => {
    if (index > 0) sources.append(document.createTextNode(' · '));
    const link = document.createElement('a');
    link.href = source.url;
    link.textContent = source.label;
    link.target = '_blank';
    link.rel = 'noopener';
    sources.append(link);
  });
  panel.append(heading, desc, meta, guideHeading, guide, stepsHeading, steps, sourcesHeading, sources);
}
