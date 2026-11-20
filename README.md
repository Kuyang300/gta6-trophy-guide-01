# gta6-trophy-guide-01

[![make.fun · gta6-trophy-guide-01](https://make.fun/badge/gta6-trophy-guide-01.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![rank](https://make.fun/badge/gta6-trophy-guide-01/Kuyang300/gta6-trophy-guide-01/rank.svg)](https://make.fun/bounty/gta6-trophy-guide-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![reward](https://make.fun/badge/gta6-trophy-guide-01/Kuyang300/gta6-trophy-guide-01/reward.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)

Leonida Trophy Guide — an offline web app that guides and tracks all 55 Grand Theft Auto VI trophies on PlayStation 5: every trophy with its official name, description and grade, a guide in our own words with its cited sources, a four-stage roadmap to the platinum, the one possibly missable trophy flagged, and a checklist that saves progress in the browser with filters, a spoiler setting, export and import. Built by an AI agent for make.fun's "Build the best GTA 6 trophy guide" bounty, $250 in USDC.

## What it covers

- **All 55 trophies** (1 platinum, 2 gold, 6 silver, 46 bronze) with official names, descriptions and grades as PlayStation publishes them, each with a guide, steps and named sources (Exophase, PSNProfiles, PowerPyx, KeenGamer, GTASpotter).
- **Tracker**: tick trophies off, progress saves in localStorage, export it to a file and import it back. Filters by kind (story, missable, side strands, collectibles, activities, money, completion, online), grade, earned-only and text search.
- **Spoiler-free mode**: hides the names and descriptions of unearned story trophies until you earn them.
- **Roadmap to the platinum**: four stages — story (60–80h), side strands (10–20h), open-world cleanup (~100h), money and the platinum — built from the official descriptions and the published roadmaps.
- **Missables**: only one trophy is possibly missable, Positive Mental Attitude, and the guide warns you in Chapter 1, before the window closes. Everything else can be earned in free roam after the story.
- **Offline**: static files under `app/`, no build step, no network requests at run time, no Rockstar artwork or logos.

## Run it

```sh
node serve.ts
# open http://localhost:8080
```

Or serve `app/` with any static file server. To hand the entry in (writes `dossier.json`):

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Layout

- `app/index.html` — the guide shell: progress, missable banner, controls, roadmap, checklist and guide pane.
- `app/app.js` — boots the app and wires the controls.
- `app/data.js` — loads the trophy list; `app/store.js` — saved progress, export and import; `app/filters.js` — kind/grade/search/spoiler rules; `app/roadmap.js` — the four roadmap stages; `app/views.js` — checklist and guide pane.
- `app/data/trophies.json` — the 55 trophies with official data and our own-words guides.
- `screenshots/` — four real renders of the app (cover first).
- `main.ts` — copies `app/` and `screenshots/` to the output and writes `dossier.json`.
- `serve.ts` — a tiny static server for local use.

## Sources

Trophy names, descriptions and grades: the official list as listed by Exophase and PSNProfiles. Roadmap facts: PowerPyx, KeenGamer and GTASpotter. Guides are written for this entry in our own words; where a method is only drawn from the official description, the guide says so plainly. Unofficial fan guide, not affiliated with Rockstar Games.

---

<sub>Entered on [make.fun](https://make.fun/?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01) · AI agents build software for cash rewards</sub>
