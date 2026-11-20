// The roadmap to the platinum, built from the official descriptions and the
// published roadmaps (PowerPyx, KeenGamer): four stages in the order to play them.
export const ROADMAP_STAGES = [
  {
    num: 1,
    title: 'Play the story',
    time: '60–80 hours · 13 trophies',
    text: 'Chapters 1–5 and the final mission, plus the named story missions. Story trophies cannot be missed. Do the Chapter 1 balcony meditation for Positive Mental Attitude before Chapter 1 ends, and scan vehicles as you travel.',
    trophyNames: [
      'Just Like Paradise', 'Paradise Lost', 'T**s Ass Drug Money', 'Vice City, Baby!',
      'Top Of The World, Ma', 'You Gotta Know When to Get Off', 'Trust', 'Break the Bank',
      'Family Matters', 'DWNFALL', 'Hi-Jacked', 'Snow Storm', 'Positive Mental Attitude',
    ],
  },
  {
    num: 2,
    title: 'Side strands and partners',
    time: '10–20 hours · 8 trophies',
    text: 'The five named character strands — Andy (Lucia-only), Kenton, Billy, Randy and Tyrone (Jason-only) — plus Bret’s hunt and the 8 stranger strands. Givers who go quiet mid-story come back in free roam.',
    trophyNames: [
      'Road to Rehabilitation', 'This Was No Boat Accident', 'The Lone Rider',
      'Supply & Demand', 'Spin On This!', 'Fair Game', 'Strangers & Freaks', 'Actions Speak Louder',
    ],
  },
  {
    num: 3,
    title: 'Open-world cleanup',
    time: 'About 100 hours · 30 trophies',
    text: 'Collectibles, activities and the open-world stunts: cards, WAiNK spots, vehicles, areas, shooting ranges, drone races, races, stunts and challenges. Fold the counters together — one trip can cover cards, WAiNK and vehicle scans at once.',
    trophyNames: [
      'Cunning Stunts', 'Master of None', 'The Shootist', 'Top Fun', 'Earn Cash, Not Kudos',
      'Baited My Tackle', 'Stick Fiddler', 'Don’t Touch My Deck', 'You WAiNKer!', 'One Last Thing',
      'Hot Together', 'Retail Therapy', 'Whip It Good', 'Gunslinger', 'Catch Me If You Can',
      'Challenging Tank', 'Sneakthief', 'Maximum Withdrawal', 'A Classic Blitz Play',
      'The Goodtime State', 'Pest Control', 'In The Beginning…', 'Capital Offense',
      'Let’s Go Bowling', 'Personal Best', 'Bad Luck, I Guess', 'The Truth Is Out There',
      'Ten Pin', 'Little Boxes', 'On the Spot',
    ],
  },
  {
    num: 4,
    title: 'Money and the platinum',
    time: 'A few hours on top · 4 trophies',
    text: 'Launder $250,000 of Marked Bills, spend $100,000 in shops, then close the 100% completion checklist. The platinum pops the moment the last trophy does.',
    trophyNames: ['Dime on the Dollar', 'Treat Yo Self', 'A Long Road', 'Vice Got a Price!'],
  },
];

export function renderRoadmap(container, trophies, earned) {
  const byName = new Map(trophies.map((t) => [t.name, t]));
  container.replaceChildren();
  for (const stage of ROADMAP_STAGES) {
    const card = document.createElement('div');
    card.className = 'stage';
    const heading = document.createElement('h3');
    const num = document.createElement('span');
    num.className = 'stage-num';
    num.textContent = stage.num;
    heading.append(num, document.createTextNode(stage.title));
    const time = document.createElement('p');
    time.textContent = stage.time;
    const text = document.createElement('p');
    text.textContent = stage.text;
    const list = document.createElement('p');
    list.className = 'stage-trophies';
    const done = stage.trophyNames.filter((name) => earned.has(name)).length;
    list.textContent = `${done}/${stage.trophyNames.length} earned — ` + stage.trophyNames.map((name) => byName.get(name)?.name ?? name).join(' · ');
    card.append(heading, time, text, list);
    container.append(card);
  }
}
