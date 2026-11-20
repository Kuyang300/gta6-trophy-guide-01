// Leonida Trophy Guide — the entry program (Node 22, standard library only).
//
// The guide itself is plain static files under app/: index.html, its ES modules,
// its stylesheet and app/data/trophies.json, the 55 official trophies with our
// own-words guides. It loads nothing over the network, so it works offline.
//
// This program hands the guide in. It copies app/ and screenshots/ from beside
// this file into the output directory and writes /output/dossier.json with the
// vendored make.fun library — the summary the judge reads (screenshots, the
// first load's files and bytes, and the source). vendor/makefun-frontend.ts
// stays exactly as the kit shipped it: the scorer rebuilds the dossier with
// its own copy and the two must match byte for byte.
//
// Run it locally with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output. Run it twice
// into two directories and diff them: both runs must write the same bytes.

import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

// Every path resolves from this file's own location, never from the working
// directory, so the program behaves the same wherever it is run from.
const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

function copyGuide() {
  mkdirSync(out, { recursive: true });
  cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
  mkdirSync(join(out, 'screenshots'), { recursive: true });
  if (existsSync(join(here, 'screenshots'))) {
    cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });
  }
}

function writeDossier() {
  // The scorer's own caps: only text_max_bytes shapes the bytes; the others
  // refuse an entry the scorer would refuse (more than 4 screenshots or one
  // over 256 KiB; more than 993 files and directories in app/ or 48 MiB of
  // app files, which count beside /output's own 1000-entry cap).
  writeFileSync(
    join(out, 'dossier.json'),
    buildDossier(out, { text_max_bytes: 163840, screenshots: { max: 4, max_bytes: 262144 }, app_max_files: 993, app_max_bytes: 50331648 }),
  );
}

function checkHandedIn() {
  // A small sanity pass over what was just written: the trophy file must be
  // there and name all 55 trophies, the screenshots must be 3 or 4 real
  // images, and the dossier must exist and be non-empty.
  const trophies = JSON.parse(readFileSync(join(out, 'app', 'data', 'trophies.json'), 'utf8'));
  if (!Array.isArray(trophies.trophies) || trophies.trophies.length !== 55) {
    throw new Error(`expected 55 trophies in the handed-in list, found ${trophies.trophies?.length ?? 0}`);
  }
  const shots = readdirSync(join(out, 'screenshots')).filter((name) => /\.(png|jpe?g)$/i.test(name));
  if (shots.length < 3 || shots.length > 4) {
    throw new Error(`expected 3 or 4 screenshots, found ${shots.length}`);
  }
  const dossierSize = statSync(join(out, 'dossier.json')).size;
  if (dossierSize === 0) throw new Error('dossier.json came out empty');
  console.log(`handed in ${trophies.trophies.length} trophies, ${shots.length} screenshots and a ${dossierSize} byte dossier to ${out}`);
}

copyGuide();
writeDossier();
checkHandedIn();
