'use strict';

const curricula = {
  middle: {
    name: 'Middle school', title: 'Curiosity becomes confidence.',
    summary: 'Guided exploration turns familiar places into opportunities to ask questions, build practical outdoor skills, and take a first step in environmental stewardship.',
    details: [
      ['◎', 'Learning approach', 'Observe, identify, try, and reflect—with guided activities and teamwork.'],
      ['⌁', 'Sample experience', 'Map a schoolyard habitat, notice where water flows, and test a simple solar model.'],
      ['↗', 'Student expression', 'Use field journals, models, and a team stewardship project to explain discoveries.']
    ]
  },
  high: {
    name: 'High school', title: 'Investigation becomes leadership.',
    summary: 'Students move into deeper investigation, interpret local environmental evidence, and develop responses that connect community priorities with sustainability and green career pathways.',
    details: [
      ['◎', 'Learning approach', 'Investigate, compare evidence, evaluate options, and communicate a reasoned response.'],
      ['⌁', 'Sample experience', 'Compare habitat conditions, trace runoff through a neighborhood, and examine solar-energy applications.'],
      ['↗', 'Student expression', 'Develop a team action proposal or stewardship project, explain the evidence, and connect it to environmental careers.']
    ]
  }
};

const modules = [
  {
    title: 'Urban Nature & Ecology', phase: 'Observe', weeks: '1–2',
    summary: 'Start with the ecosystem outside the door. Explore biodiversity, local habitats, and the relationships between living things and the built environment.',
    middle: ['Create a field journal of plants and animals in a nearby green space. Compare what lives in sunny and shaded areas.', 'A habitat map and observations students can explain to their peers.'],
    high: ['Compare biodiversity and habitat conditions across two nearby spaces. Use observations to discuss how the built environment affects urban life.', 'A comparison of local habitats supported by field observations.']
  },
  {
    title: 'Water & Watersheds', phase: 'Trace', weeks: '3–4',
    summary: 'Follow the path of water through the city. Connect rainfall, runoff, water quality, local waterways, and environmental health.',
    middle: ['Use a simple watershed model to see where rainwater goes. Map how water moves from a schoolyard or recreation center toward a local waterway.', 'An annotated water-flow map connecting a familiar place to its watershed.'],
    high: ['Trace neighborhood runoff routes and compare paved and planted surfaces. Investigate how land use can affect water quality and identify a possible response.', 'A runoff investigation with an evidence-based recommendation.']
  },
  {
    title: 'Outdoor Exploration & Skills', phase: 'Navigate', weeks: '5–6',
    summary: 'Build the skills to learn outdoors with greater confidence. Practice navigation, field observation, outdoor safety, and Leave No Trace principles.',
    middle: ['Work with a team to read a map, identify landmarks, and follow a guided route while practicing responsible outdoor habits.', 'A field-skills checklist and a reflection on confidence learning outdoors.'],
    high: ['Plan a local field route, identify access and safety considerations, and explain how the team will minimize its environmental impact.', 'A route plan that brings together navigation, preparation, and responsible field practice.']
  },
  {
    title: 'Environmental Stewardship', phase: 'Care', weeks: '7–8',
    summary: 'Explore how everyday choices can support shared spaces. Connect waste, native plants, pollinators, and neighborhood care to practical stewardship.',
    middle: ['Explore pollinator needs or waste in a shared space. Choose a small team action, such as a native-plant activity or a waste-awareness project.', 'A documented stewardship activity with a student explanation of why it matters.'],
    high: ['Assess a local stewardship need, compare possible actions, and build a team plan that considers resources, community benefit, and ongoing care.', 'A stewardship plan with a clear purpose, roles, and a way to document progress.']
  },
  {
    title: 'Renewable Energy & Our Environment', phase: 'Connect', weeks: '9–10',
    summary: 'Connect energy use to environmental choices. Explore solar energy, climate connections, and the people working in clean energy and infrastructure.',
    middle: ['Test a simple solar model and notice how light conditions change its performance. Explore where renewable energy appears in everyday life.', 'A model or demonstration that explains how sunlight can be used as energy.'],
    high: ['Investigate a solar-energy application, compare conditions that affect its use, and connect the investigation to clean-energy roles and skills.', 'An energy-use explanation linking a practical application with a green career pathway.']
  },
  {
    title: 'Youth Environmental Action', phase: 'Lead', weeks: '11–12',
    summary: 'Bring the learning together. Teams use their discoveries to develop a local project, presentation, or stewardship action and share what they have learned.',
    middle: ['Choose a local issue the group explored. Create a team model, presentation, or stewardship action that shares one clear idea with others.', 'A youth-created project and reflection showing how learning connects to community care.'],
    high: ['Use evidence from earlier modules to develop a community-focused action project or proposal. Present the rationale, next steps, and relevant environmental career connections.', 'A project or proposal with supporting evidence, a team presentation, and reflection.']
  }
];

const scenes = {
  nature: ['01', 'A park is a living laboratory.', 'Observe species, compare habitats, and investigate how trees and native plants support an urban ecosystem.'],
  water: ['02', 'Every street belongs to a watershed.', 'Trace rain from a roof to a local waterway. Explore how pavement, plants, and everyday choices change the path of runoff.'],
  energy: ['03', 'A rooftop connects science to possibility.', 'Explore how solar energy works, test simple models, and connect environmental learning with clean-energy careers.']
};

const impacts = [
  {
    title: 'From a new term to a local connection.',
    description: 'Students connect concepts such as watersheds, biodiversity, and energy use to places and experiences in their own community.',
    before: 'A short learning check surfaces what students already know.',
    after: 'A follow-up check and project explanation show how their understanding develops.',
    report: 'Pre/post learning comparisons, student work samples, and educator observations.'
  },
  {
    title: 'From uncertainty to outdoor confidence.',
    description: 'Students build comfort observing, navigating, and learning in outdoor environments while practicing responsible field habits.',
    before: 'Students reflect on their comfort outdoors and educators observe initial field skills.',
    after: 'A later reflection and field-skills checklist document confidence and practical progress.',
    report: 'Student reflections, field-skills observations, and feedback about access and belonging.'
  },
  {
    title: 'From noticing a need to taking action.',
    description: 'Students practice caring for shared spaces and explain how a team action responds to an environmental need.',
    before: 'Teams identify an issue, explain why it matters, and set a project purpose.',
    after: 'Projects, presentations, or action records show what teams did and learned.',
    report: 'Project documentation, participation records, student explanations, and team reflections.'
  },
  {
    title: 'From an interest to a possible pathway.',
    description: 'Students discover connections between environmental learning and work in energy, infrastructure, conservation, and sustainability.',
    before: 'An opening discussion captures the environmental and energy roles students recognize.',
    after: 'Students identify a career connection and describe a skill or next step they want to explore.',
    report: 'Career-awareness reflections and examples of how students connect program experiences to future interests.'
  }
];

// These diagrams make the learning connections explicit without remote image dependencies.
const diagramStart = '<svg viewBox="0 0 430 350" xmlns="http://www.w3.org/2000/svg"><defs><marker id="arrowhead" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 10 5 0 10" fill="#527b59"/></marker></defs><g font-family="system-ui,sans-serif" fill="#183e35">';
const diagramEnd = '</g></svg>';
const diagrams = [
  `<text x="29" y="31" font-size="9" letter-spacing="1.7">READING A LOCAL ECOSYSTEM</text>
  <circle cx="215" cy="163" r="99" fill="none" stroke="#8ba777" stroke-dasharray="4 7"/>
  <path d="M215 195v-85m0 35-23-19m23 35 26-26" stroke="#527b59" stroke-width="6" stroke-linecap="round"/>
  <path d="M174 127c-12-29 7-57 34-57 15-12 48 2 43 22 31 15 23 52-1 57-22 25-64 9-76-22" fill="#477953"/>
  <path d="M192 108c-3-20 20-30 36-21 19 7 9 32-7 36-15 5-25-1-29-15" fill="#7fa566"/>
  <ellipse cx="215" cy="206" rx="58" ry="12" fill="#9eb881"/>
  <g fill="#f7f5ed" stroke="#91ac7c"><circle cx="100" cy="164" r="28"/><circle cx="318" cy="110" r="28"/><circle cx="286" cy="249" r="28"/></g>
  <path d="M88 168c5-14 15-15 23-13-4 13-12 18-23 13m3-2 13-8" fill="#72945f" stroke="#41644b" stroke-width="1.5"/>
  <path d="M302 111c9-15 25-10 30 1-10-5-17 6-30-1Z" fill="#d2a34d"/><path d="m325 112 10-6m-18 8-1 6" stroke="#41644b" stroke-width="2"/>
  <path d="m282 248-8-10m12 10 9-10m-13 13-9 10m13-10 10 9" stroke="#41644b" stroke-width="2"/><ellipse cx="284" cy="249" rx="6" ry="10" fill="#edc666"/>
  <text x="100" y="210" font-size="11" text-anchor="middle">Native plants</text><text x="318" y="155" font-size="11" text-anchor="middle">Habitat</text><text x="286" y="295" font-size="11" text-anchor="middle">Biodiversity</text>
  <text x="29" y="330" font-size="10">Notice the relationships, not just the individual species.</text>`,
  `<text x="29" y="31" font-size="9" letter-spacing="1.7">FOLLOW THE WATER</text>
  <g fill="#edf2df"><ellipse cx="108" cy="88" rx="44" ry="22"/><ellipse cx="93" cy="72" rx="24" ry="21"/><ellipse cx="126" cy="76" rx="22" ry="20"/></g>
  <g stroke="#6e9fa2" stroke-width="2" stroke-linecap="round"><path d="m86 117-5 11m24-11-5 11m24-11-5 11"/></g>
  <path d="m58 187 53-42 54 42v66H58z" fill="#e9c985" stroke="#527b59" stroke-width="2"/><path d="m49 187 62-49 64 49" stroke="#183e35" stroke-width="5" fill="none"/><path d="M102 253v-34h23v34" fill="#64856a"/>
  <path d="M175 252h61l24 33h105" fill="none" stroke="#6e9fa2" stroke-width="5" marker-end="url(#arrowhead)"/>
  <path d="m202 239 4-33m18 32 4-23m13 27 4-29" stroke="#5b8659" stroke-width="3"/><path d="M197 211c-11-16 2-22 10-12 17-12 21 7 4 14" fill="#8eb16f"/>
  <path d="M301 285c25-16 60-13 89 0v44h-89z" fill="#80b2b5"/>
  <path d="M307 302c26-10 51-8 77 0m-66 14c18-5 34-4 49 0" fill="none" stroke="#dce9d7" stroke-width="2"/>
  <text x="108" y="61" font-size="11" text-anchor="middle">Rainfall</text><text x="110" y="281" font-size="11" text-anchor="middle">Built surfaces</text><text x="230" y="188" font-size="11" text-anchor="middle">Planted spaces</text><text x="345" y="260" font-size="11" text-anchor="middle">Local waterway</text>`,
  `<text x="29" y="31" font-size="9" letter-spacing="1.7">BUILD CONFIDENCE IN THE FIELD</text>
  <path d="m52 94 108-20 103 23 111-17v202l-111 17-103-23-108 20z" fill="#f3efd4" stroke="#93a978" stroke-width="2"/>
  <path d="M160 74v202m103-179v202" stroke="#c5cea6" stroke-width="2"/>
  <path d="M58 227c56-61 85-11 133-61s82-28 176-59" fill="none" stroke="#a0c0b0" stroke-width="14"/>
  <path d="M98 246c13-62 44-101 90-93s89 97 136 69" fill="none" stroke="#527b59" stroke-width="3" stroke-dasharray="5 7"/>
  <circle cx="98" cy="246" r="7" fill="#183e35"/><circle cx="324" cy="222" r="8" fill="#f0ca6e" stroke="#527b59" stroke-width="2"/>
  <g transform="translate(318 105)"><circle r="36" fill="#fffdf2" stroke="#527b59" stroke-width="2"/><path d="m0-25 12 29L0-1-12 4Z" fill="#527b59"/><path d="M0 25 12-4 0 1-12-4Z" fill="#b2c397"/><text x="0" y="-43" text-anchor="middle" font-size="10">N</text></g>
  <text x="29" y="330" font-size="11">Prepare → Navigate → Observe → Leave no trace</text>`,
  `<text x="29" y="31" font-size="9" letter-spacing="1.7">SMALL ACTIONS, SHARED SPACES</text>
  <path d="m70 229 170-42 121 47-168 45Z" fill="#b9ac78" stroke="#527b59" stroke-width="2"/><path d="m70 229 123 50 168-45v25l-168 45-123-48Z" fill="#a18e5a" stroke="#527b59" stroke-width="2"/>
  <g stroke="#527b59" stroke-width="4" fill="none"><path d="M140 241v-61m46 72v-91m40 79v-81m47 68v-53m42 66v-41"/></g>
  <g fill="#7b9e5c"><path d="M139 214c-29-2-36-22-18-29 23-2 25 21 18 29m49 2c27-6 36-26 15-30-23 0-26 18-15 30m36-18c-26-3-35-23-17-28 22-4 25 14 17 28m51 11c23-3 32-25 13-28-21-3-25 16-13 28m37 18c22-2 31-19 16-25-20-2-22 14-16 25"/></g>
  <g fill="#f1c466" stroke="#d9ac4d"><circle cx="140" cy="173" r="12"/><circle cx="186" cy="154" r="14"/><circle cx="226" cy="151" r="12"/><circle cx="273" cy="168" r="10"/></g>
  <g transform="translate(293 113) rotate(-20)"><ellipse cx="-8" cy="-8" rx="11" ry="7" fill="#fffdf2"/><ellipse cx="8" cy="-8" rx="11" ry="7" fill="#fffdf2"/><ellipse rx="13" ry="7" fill="#e8ba5c" stroke="#527b59"/><path d="M-4-6v12m7-12v12" stroke="#527b59" stroke-width="2"/></g>
  <text x="60" y="107" font-size="11">Native plants</text><path d="m120 114 21 34" stroke="#527b59" fill="none" marker-end="url(#arrowhead)"/>
  <text x="280" y="83" font-size="11">Pollinators</text><text x="90" y="330" font-size="11">Choose an action. Explain the benefit. Plan its care.</text>`,
  `<text x="29" y="31" font-size="9" letter-spacing="1.7">CONNECT SCIENCE TO CLEAN ENERGY</text>
  <circle cx="95" cy="110" r="31" fill="#f2c868"/><g stroke="#c6973b" stroke-width="2"><path d="M95 65V53m0 115v-12m-45-46H38m114 0h-12M63 78l-9-9m82 82-9-9m9-73-9 9m-64 64-9 9"/></g>
  <path d="m135 131 45 34" stroke="#527b59" stroke-width="2" marker-end="url(#arrowhead)"/>
  <path d="m184 166 115-25 36 71-115 24Z" fill="#336e7a" stroke="#183e35" stroke-width="2"/>
  <path d="m214 160 35 69m-8-74 35 69m-8-75 35 69m-107-27 114-25m-103 46 114-24m-83 43-3 19m61-32 7 19" stroke="#b4d6cd" stroke-width="1.5"/>
  <path d="M278 247v26h73" stroke="#527b59" stroke-width="3" fill="none" marker-end="url(#arrowhead)"/>
  <path d="M356 240c-16-14-3-38 13-38 23 1 30 26 14 40l-4 12h-19Z" fill="#f3d181" stroke="#527b59" stroke-width="2"/><path d="M361 260h17m-15 6h13" stroke="#527b59" stroke-width="3"/>
  <text x="95" y="184" font-size="11" text-anchor="middle">Sunlight</text><text x="257" y="277" font-size="11" text-anchor="middle">Solar panel</text><text x="370" y="293" font-size="11" text-anchor="middle">Electricity</text><text x="29" y="330" font-size="10">Explore a model, then connect it to a real-world application.</text>`,
  `<text x="29" y="31" font-size="9" letter-spacing="1.7">TURN LEARNING INTO YOUTH ACTION</text>
  <path d="m73 128 74-22 68 25v146l-75-25-67 24Z" fill="#f3efd4" stroke="#8fa77a" stroke-width="2"/>
  <path d="M146 106v146m-55-90 35-12m-35 33 35-12m36-12 34 12m-34 12 34 12" fill="none" stroke="#aabc8f" stroke-width="2"/>
  <circle cx="139" cy="185" r="22" fill="#e8c16b"/><path d="M131 186c-7-15 6-24 16-18 14 9-6 25-8 28" fill="none" stroke="#527b59" stroke-width="3"/>
  <path d="M218 191h33" stroke="#527b59" stroke-width="2" marker-end="url(#arrowhead)"/>
  <rect x="265" y="121" width="101" height="135" rx="5" fill="#fffdf3" stroke="#8fa77a" stroke-width="2"/>
  <rect x="286" y="112" width="60" height="18" rx="4" fill="#527b59"/>
  <g fill="none" stroke="#527b59" stroke-width="2"><path d="m279 155 5 5 9-11m-14 34 5 5 9-11m-14 34 5 5 9-11"/><path d="M306 155h43m-43 28h43m-43 28h43" stroke="#aabc8f"/></g>
  <text x="141" y="307" text-anchor="middle" font-size="11">Local discovery</text><text x="316" y="307" text-anchor="middle" font-size="11">A team response</text><text x="29" y="330" font-size="10">Explain the evidence. Share the project. Reflect on the learning.</text>`
];

const state = { track: 'middle', module: 0 };
const byId = id => document.getElementById(id);

function renderModule() {
  const item = modules[state.module];
  document.querySelectorAll('.module-tab').forEach((button, index) => {
    const selected = index === state.module;
    button.setAttribute('aria-selected', String(selected));
    button.tabIndex = selected ? 0 : -1;
  });
  byId('module-panel').setAttribute('aria-labelledby', `module-${state.module}`);
  byId('module-label').textContent = `WEEKS ${item.weeks} · ${item.phase.toUpperCase()}`;
  byId('module-title').textContent = item.title;
  byId('module-summary').textContent = item.summary;
  byId('activity-track').textContent = `${curricula[state.track].name.toUpperCase()} · SAMPLE ACTIVITY`;
  byId('module-activity').textContent = item[state.track][0];
  byId('module-output').textContent = item[state.track][1];
  byId('module-visual').innerHTML = diagramStart + diagrams[state.module] + diagramEnd;
  byId('module-position').textContent = `Module ${state.module + 1} of 6`;
  byId('next-module').innerHTML = state.module === 5 ? 'Back to first module <span aria-hidden="true">↻</span>' : 'Next module <span aria-hidden="true">→</span>';
}

function setTrack(track) {
  if (!Object.hasOwn(curricula, track)) return;
  state.track = track;
  const item = curricula[track];
  document.querySelectorAll('.curriculum-tab').forEach(button => {
    const selected = button.dataset.track === track;
    button.setAttribute('aria-selected', String(selected));
    button.tabIndex = selected ? 0 : -1;
  });
  byId('curriculum-panel').setAttribute('aria-labelledby', `tab-${track}`);
  byId('track-label').textContent = `THE ${item.name.toUpperCase()} CURRICULUM`;
  byId('track-title').textContent = item.title;
  byId('track-summary').textContent = item.summary;
  byId('track-details').replaceChildren(...item.details.map(([icon, title, text]) => {
    const article = document.createElement('article');
    const symbol = document.createElement('span');
    symbol.className = 'detail-icon'; symbol.setAttribute('aria-hidden', 'true'); symbol.textContent = icon;
    const body = document.createElement('div');
    const heading = document.createElement('h4'); heading.textContent = title;
    const description = document.createElement('p'); description.textContent = text;
    body.append(heading, description); article.append(symbol, body);
    return article;
  }));
  byId('journey-track').value = track;
  const emailBody = `Hello Phase 3 team,\n\nI would like to explore Urban Earth Academy for ${item.name.toLowerCase()} students.\n\nOrganization:\nCommunity / location:\nPreferred timeline:\nApproximate cohort size:\n\nThank you.`;
  byId('partner-email').href = `mailto:info@phase3training.org?subject=${encodeURIComponent('Urban Earth Academy partnership')}&body=${encodeURIComponent(emailBody)}`;
  renderModule();
}

function setImpact(index) {
  const item = impacts[index];
  document.querySelectorAll('.impact-tab').forEach((button, i) => {
    button.setAttribute('aria-selected', String(i === index));
    button.tabIndex = i === index ? 0 : -1;
  });
  byId('impact-panel').setAttribute('aria-labelledby', `impact-${index}`);
  byId('impact-heading').textContent = item.title;
  byId('impact-description').textContent = item.description;
  byId('impact-before').textContent = item.before;
  byId('impact-after').textContent = item.after;
  byId('impact-report').textContent = item.report;
}

function enableTabs(selector, onSelect, vertical = false) {
  const tabs = Array.from(document.querySelectorAll(selector));
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => onSelect(tab, index));
    tab.addEventListener('keydown', event => {
      let target;
      if (event.key === (vertical ? 'ArrowDown' : 'ArrowRight')) target = (index + 1) % tabs.length;
      else if (event.key === (vertical ? 'ArrowUp' : 'ArrowLeft')) target = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') target = 0;
      else if (event.key === 'End') target = tabs.length - 1;
      if (target === undefined) return;
      event.preventDefault();
      tabs[target].focus();
      onSelect(tabs[target], target);
    });
  });
}

enableTabs('.curriculum-tab', tab => setTrack(tab.dataset.track));
enableTabs('.module-tab', (_, index) => { state.module = index; renderModule(); });
enableTabs('.impact-tab', (_, index) => setImpact(index), true);
byId('journey-track').addEventListener('change', event => setTrack(event.target.value));
byId('next-module').addEventListener('click', () => { state.module = (state.module + 1) % modules.length; renderModule(); });
byId('module-position').setAttribute('aria-live', 'polite');

document.querySelectorAll('.scene-pin').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.scene-pin').forEach(pin => pin.setAttribute('aria-pressed', String(pin === button)));
    const [number, title, copy] = scenes[button.dataset.scene];
    byId('scene-number').textContent = number;
    byId('scene-heading').textContent = title;
    byId('scene-copy').textContent = copy;
  });
});

const menuButton = document.querySelector('.menu-toggle');
const navigation = byId('site-nav');
function closeMenu() { menuButton.setAttribute('aria-expanded', 'false'); navigation.classList.remove('is-open'); }
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') { closeMenu(); menuButton.focus(); }
});
window.matchMedia('(min-width: 801px)').addEventListener('change', closeMenu);

setTrack('middle');
