/*
 * Interactive planner for FB's electrical programme.
 *
 * Rendering is deliberately dependency-free: the curriculum matrix and
 * timetable are generated from the same state object. State is persisted in
 * localStorage independently for each study mode.
 */

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZÞÆ";
const DAYS = ["Mán", "Þri", "Mið", "Fim"];
const START_TIMES = ["17:20", "18:00", "18:40", "19:20", "20:10", "21:00", "21:40"];
const END_TIMES = ["18:00", "18:40", "19:20", "20:10", "20:50", "21:40", "22:20"];

// code, timetable slots, and teaching period (a = all semester, 1/2 = half).
const RAW_COURSES = `FRLA3RA05 VWX a
FRLA3RB05 YZÞ a
LYST3RB05 ABCDEF 1
RAFL1GA03 KLMN 1
RAFL1GB03 KLMN 2
RAFL2GC03 RSTU 1
RAFL3RE04 RSTU 2
RAFL3GD03 HIJ a
RAFM1GA05 OPQ a
RAFM2GB05 HIJ a
RAFM2GC05 ABCDEF 1
RAFM3GD05 ABCDEF 2
RAFM3RE05 OPQRST 1
RAFM3RF05 OPQRST 2
RAST2RB05 VWX a
RATM2GA05 VWX a
RATM2GB05 YZÞ a
RLTK2RB05 ABCDEF 1
RLTK3RB05 ABCDEF 2
RRVE2RA03 HIJK 1
RRVE2RB03 HIJK 2
STÝR1GA05 RST a
STÝR2GB05 ABC a
STÝR3GC05 KLM a
STÝR3RD05 LMN a
TNTÆ1GA03 VWXY 1
TNTÆ2GB05 VWXYZÞ 2
TNTÆ3GC05 OPQ a
VGRT1GA03 DEFG 1
VGRT2GB03 DEFG 2
VGRT2GC04 HIJ a
VSME2GR05 KLM a
SKYN2EÁ01 - a`;

const COURSES = RAW_COURSES.split("\n").map((row) => {
  const [code, slots, period] = row.split(" ");
  const start = slots === "-" ? -1 : LETTERS.indexOf(slots[0]);
  const end = slots === "-" ? -1 : LETTERS.indexOf(slots.at(-1));
  const info = COURSE_INFO[code];
  return {
    code,
    slots,
    period,
    start,
    end,
    day: Math.floor(start / 7),
    credits: Number(code.slice(-2)),
    subject: code.slice(0, 4),
    weekStart: period === "2" ? 9 : 1,
    weekEnd: period === "1" ? 8 : 16,
    ...info
  };
});

const SUBJECT_NAMES = {
  FRLA: "Forritanleg raflagnakerfi",
  LYST: "Lýsingatækni",
  RAFL: "Raflagnir",
  RAFM: "Rafmagnsfræði og mælingar",
  RAST: "Raflagnastaðall",
  RATM: "Rafeindatækni og mælingar",
  RLTK: "Raflagnateikningar",
  RRVE: "Rafvélar",
  "STÝR": "Stýringar og rökrásir",
  "TNTÆ": "Tölvur og nettækni",
  VGRT: "Verktækni grunnnáms",
  VSME: "Smáspennuvirki",
  SKYN: "Skyndihjálp"
};

const PLANS = {
  day: [
    "RAFL1GA03 RAFM1GA05 SKYN2EÁ01 STÝR1GA05 TNTÆ1GA03 VGRT1GA03",
    "RAFL1GB03 RAFM2GB05 STÝR2GB05 TNTÆ2GB05 VGRT2GB03",
    "RATM2GA05 RAFL2GC03 RAFM2GC05 STÝR3GC05 TNTÆ3GC05 VGRT2GC04",
    "RATM2GB05 RAFL3RE04 RAFM3GD05 VSME2GR05",
    "FRLA3RA05 RLTK2RB05 RAFM3RE05 RRVE2RA03 STÝR3RD05",
    "FRLA3RB05 LYST3RB05 RAST2RB05 RLTK3RB05 RAFL3GD03 RAFM3RF05 RRVE2RB03"
  ],
  eve: [
    "STÝR2GB05 RAFM1GA05 VGRT1GA03 VGRT2GB03 STÝR1GA05 SKYN2EÁ01",
    "RAFM2GB05 RAFL1GA03 RAFL1GB03 TNTÆ1GA03 TNTÆ2GB05",
    "RAFM2GC05 RAFM3GD05 VGRT2GC04 STÝR3GC05",
    "LYST3RB05 TNTÆ3GC05 RATM2GA05 RAFL2GC03 RAFL3RE04",
    "RLTK2RB05 RLTK3RB05 RAFL3GD03 VSME2GR05",
    "RAFM3RE05 RAFM3RF05 FRLA3RA05 RATM2GB05",
    "RRVE2RA03 RRVE2RB03 STÝR3RD05 RAST2RB05 FRLA3RB05"
  ],
  e4: [
    "RAFL1GA03 RAFL1GB03 RAFM1GA05 SKYN2EÁ01 STÝR1GA05 STÝR2GB05 TNTÆ1GA03 TNTÆ2GB05 VGRT1GA03 VGRT2GB03 VGRT2GC04",
    "LYST3RB05 RLTK3RB05 RAFM2GB05 VSME2GR05 RATM2GA05",
    "RAFM2GC05 RAFM3GD05 RAFL3GD03 STÝR3GC05 TNTÆ3GC05 RAFL2GC03 RAFL3RE04 FRLA3RA05 RATM2GB05",
    "RLTK2RB05 RRVE2RA03 RRVE2RB03 STÝR3RD05 RAFM3RE05 RAFM3RF05 RAST2RB05 FRLA3RB05"
  ]
};

// Explicit prerequisite relationships used by the visual warning system.
const PREREQUISITES = {
  FRLA3RB05: ["FRLA3RA05"],
  RAFL1GB03: ["RAFL1GA03"],
  RAFL2GC03: ["RAFL1GB03"],
  RAFL3GD03: ["RAFL2GC03"],
  RAFL3RE04: ["RAFL3GD03"],
  RAFM2GB05: ["RAFM1GA05"],
  RAFM2GC05: ["RAFM2GB05"],
  RAFM3GD05: ["RAFM2GC05"],
  RAFM3RE05: ["RAFM3GD05"],
  RAFM3RF05: ["RAFM3RE05"],
  RATM2GA05: ["RAFM1GA05"],
  RATM2GB05: ["RATM2GA05"],
  RLTK3RB05: ["RLTK2RB05"],
  RRVE2RB03: ["RRVE2RA03"],
  "STÝR2GB05": ["STÝR1GA05"],
  "STÝR3GC05": ["STÝR2GB05"],
  "STÝR3RD05": ["STÝR3GC05"],
  "TNTÆ2GB05": ["TNTÆ1GA03"],
  "TNTÆ3GC05": ["TNTÆ2GB05"],
  VGRT2GB03: ["VGRT1GA03"],
  VGRT2GC04: ["VGRT2GB03"]
};

const SUBJECTS = [...new Set(COURSES.map((course) => course.subject))];
const DAY_COLORS = ["#c8233a", "#8f3f93", "#a64d18", "#317d88"];
const DONE_COLOR = "#666b68";
const COURSE_BY_CODE = Object.fromEntries(COURSES.map((course) => [course.code, course]));
const ORIGINAL_SEMESTER = {};
PLANS.day.forEach((codes, index) => codes.split(" ").forEach((code) => { ORIGINAL_SEMESTER[code] = index + 1; }));

let mode = getStored("rafmode", "e4");
if (!PLANS[mode]) mode = "e4";
let state = loadState();
let selectedCourse = null;
let resetTimer;

function storageKey() {
  return mode === "eve" ? "rafplan4e7" : mode === "e4" ? "rafplan4e4" : "rafplan4d";
}

function getStored(key, fallback) {
  try { return localStorage.getItem(key) || fallback; } catch { return fallback; }
}

function makeDefaultState(useSavedLayout = true) {
  const plan = {};
  let semesterCount = PLANS[mode].length;
  PLANS[mode].forEach((codes, index) => codes.split(" ").forEach((code) => { plan[code] = index + 1; }));

  // Keep compatibility with arrangements exported by the original site.
  if (useSavedLayout) {
    try {
      const legacy = JSON.parse(localStorage.getItem(`${storageKey()}d`) || "null");
      if (legacy?.plan) {
        Object.assign(plan, legacy.plan);
        semesterCount = legacy.n || semesterCount;
      }
    } catch { /* Invalid local data is safely ignored. */ }
  }
  return { done: {}, muted: {}, plan, n: semesterCount, week: 0, colorMode: "day", semesterHistory: {} };
}

function loadState() {
  const fresh = makeDefaultState();
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey()) || "null");
    if (saved) Object.assign(fresh, saved);
  } catch { /* Invalid local data is safely ignored. */ }
  fresh.done ||= {};
  fresh.muted ||= {};
  fresh.plan ||= {};
  fresh.semesterHistory ||= {};
  // Migrate state keys used by the source site.
  if (fresh.wk !== undefined && fresh.week === 0) fresh.week = fresh.wk;
  if (fresh.cm && fresh.colorMode === "day") fresh.colorMode = fresh.cm;
  if (fresh.sh && !Object.keys(fresh.semesterHistory).length) fresh.semesterHistory = fresh.sh;
  if (fresh.g && !Object.keys(fresh.muted).length) fresh.muted = fresh.g;
  return fresh;
}

function saveState() {
  try { localStorage.setItem(storageKey(), JSON.stringify(state)); } catch { /* The app still works without storage. */ }
}

function setMode(nextMode) {
  mode = nextMode;
  try { localStorage.setItem("rafmode", mode); } catch { /* no-op */ }
  selectedCourse = null;
  state = loadState();
  render();
}

function setOption(key, value) {
  state[key] = value;
  saveState();
  render();
}

function semesterNumbers() {
  return Array.from({ length: state.n }, (_, index) => index + 1);
}

function formatTime(course) {
  if (course.day < 0) return "Helgarnámskeið · fös 13–18, lau 9–16";
  const weeks = course.period === "a" ? "" : ` · vika ${course.weekStart}–${course.weekEnd}`;
  return `${DAYS[course.day]} ${START_TIMES[course.start % 7]}–${END_TIMES[course.end % 7]}${weeks}`;
}

function subjectColor(subject) {
  return `hsl(${SUBJECTS.indexOf(subject) * (360 / SUBJECTS.length)} 50% 38%)`;
}

function semesterColor(semester) {
  return `hsl(${(semester - 1) * 40 + 200} 52% 38%)`;
}

function courseColor(course) {
  if (state.muted[course.code]) return DONE_COLOR;
  if (state.colorMode === "day") return DAY_COLORS[course.day] || "#56645e";
  if (state.colorMode === "semester") return semesterColor(ORIGINAL_SEMESTER[course.code] || 1);
  return subjectColor(course.subject);
}

function courseTextColor(course) {
  return state.colorMode === "day" && course.day === 3 && !state.done[course.code] ? "#fff" : "#fff";
}

function allowDrop(event) {
  event.preventDefault();
  event.currentTarget.classList.add("is-over");
}

function startDrag(event, code) {
  event.dataTransfer.setData("text/plain", code);
  event.dataTransfer.effectAllowed = "move";
  selectedCourse = null;
}

function dropCourse(event, semester) {
  event.preventDefault();
  event.currentTarget.classList.remove("is-over");
  moveCourse(event.dataTransfer.getData("text/plain"), semester);
}

function removeFromSemesterHistory(code) {
  for (const [semester, codes] of Object.entries(state.semesterHistory)) {
    if (codes.includes(code)) delete state.semesterHistory[semester];
  }
}

function moveCourse(code, semester) {
  if (!COURSE_BY_CODE[code]) return;
  removeFromSemesterHistory(code);
  if (semester < 0) {
    setCourseDone(code, true);
    return;
  }
  delete state.done[code];
  if (semester) state.plan[code] = Number(semester);
  else delete state.plan[code];
  saveState();
  render();
}

function toggleCourse(event, code) {
  event.stopPropagation();
  if (selectedCourse && selectedCourse !== code) {
    const destination = state.done[code] ? -1 : (state.plan[code] || 0);
    placeSelected(destination);
    return;
  }
  if (state.muted[code]) delete state.muted[code];
  else state.muted[code] = true;
  saveState();
  render();
}

function pickCourse(event, code) {
  event.stopPropagation();
  selectedCourse = selectedCourse === code ? null : code;
  render();
}

function placeSelected(semester) {
  if (!selectedCourse) return;
  const code = selectedCourse;
  selectedCourse = null;
  moveCourse(code, semester);
}

function setCourseDone(code, isDone) {
  if (isDone) {
    state.done[code] = true;
    delete state.muted[code];
    delete state.plan[code];
  } else {
    delete state.done[code];
    removeFromSemesterHistory(code);
  }
  saveState();
  render();
}

function addSemester(change) {
  state.n = Math.max(1, Math.min(12, state.n + change));
  for (const code of Object.keys(state.plan)) {
    if (state.plan[code] > state.n) delete state.plan[code];
  }
  for (const semester of Object.keys(state.semesterHistory)) {
    if (Number(semester) > state.n) delete state.semesterHistory[semester];
  }
  saveState();
  render();
}

function insertSemester(before) {
  if (state.n >= 12) return;
  state.n += 1;
  const shiftedPlan = {};
  for (const [code, semester] of Object.entries(state.plan)) {
    shiftedPlan[code] = semester >= before ? semester + 1 : semester;
  }
  state.plan = shiftedPlan;
  const shiftedHistory = {};
  for (const [semester, codes] of Object.entries(state.semesterHistory)) {
    shiftedHistory[Number(semester) >= before ? Number(semester) + 1 : semester] = codes;
  }
  state.semesterHistory = shiftedHistory;
  saveState();
  render();
}

function markSemesterDone(semester, isDone) {
  if (isDone) {
    const codes = COURSES.filter((course) => state.plan[course.code] === semester).map((course) => course.code);
    codes.forEach((code) => {
      state.done[code] = true;
      delete state.muted[code];
      delete state.plan[code];
    });
    state.semesterHistory[semester] = codes;
  } else {
    (state.semesterHistory[semester] || []).forEach((code) => {
      if (state.done[code]) {
        delete state.done[code];
        state.plan[code] = semester;
      }
    });
    delete state.semesterHistory[semester];
  }
  saveState();
  render();
}

function resetPlan() {
  const button = document.getElementById("reset-button");
  if (button.dataset.confirm) {
    clearTimeout(resetTimer);
    state = makeDefaultState(false);
    saveState();
    selectedCourse = null;
    button.removeAttribute("data-confirm");
    render();
    return;
  }
  button.dataset.confirm = "true";
  button.textContent = "Smelltu aftur til að staðfesta";
  resetTimer = setTimeout(() => {
    button.removeAttribute("data-confirm");
    button.textContent = "Núllstilla í námskrá";
  }, 4000);
}

function findWarnings() {
  const planned = COURSES.filter((course) => state.plan[course.code]);
  const conflicts = new Set();
  const conflictRows = [];

  for (let first = 0; first < planned.length; first += 1) {
    for (let second = first + 1; second < planned.length; second += 1) {
      const a = planned[first];
      const b = planned[second];
      const overlaps = state.plan[a.code] === state.plan[b.code]
        && a.start <= b.end && b.start <= a.end
        && a.weekStart <= b.weekEnd && b.weekStart <= a.weekEnd;
      if (overlaps) {
        conflicts.add(a.code);
        conflicts.add(b.code);
        conflictRows.push([state.plan[a.code], a.code, b.code]);
      }
    }
  }

  const missing = new Map();
  planned.forEach((course) => {
    const unmet = (PREREQUISITES[course.code] || []).filter((requiredCode) => {
      if (state.done[requiredCode]) return false;
      const prerequisiteSemester = state.plan[requiredCode];
      return !prerequisiteSemester || prerequisiteSemester > state.plan[course.code];
    });
    if (unmet.length) missing.set(course.code, unmet);
  });

  return { conflicts, conflictRows, missing };
}

function warningIcon(course, warnings) {
  return warnings.conflicts.has(course.code) || warnings.missing.has(course.code)
    ? '<span class="course-pill__warning" aria-hidden="true">⚠</span>'
    : "";
}

function coursePill(course, canRemove, warnings) {
  const statusClass = warnings.conflicts.has(course.code)
    ? " is-conflict"
    : warnings.missing.has(course.code) ? " is-prerequisite" : "";
  const selectedClass = selectedCourse === course.code ? " is-selected" : "";
  const mainAction = canRemove
    ? `<button type="button" title="Færa áfanga (síma)" aria-label="Færa ${course.title}" aria-pressed="${selectedCourse === course.code}" onclick="pickCourse(event, '${course.code}')">⇄</button>
       <button type="button" title="Setja til hliðar" aria-label="Setja ${course.title} til hliðar" aria-pressed="${Boolean(state.muted[course.code])}" onclick="toggleCourse(event, '${course.code}')">◐</button>
       <button type="button" title="Merkja lokið" aria-label="Merkja ${course.title} lokið" onclick="event.stopPropagation(); setCourseDone('${course.code}', true)">Fjarlægja</button>`
    : `<button type="button" title="Setja aftur í óraðað" aria-label="Setja ${course.title} aftur í óraðað" onclick="event.stopPropagation(); setCourseDone('${course.code}', false)">↩</button>`;

  return `<article class="course-pill${statusClass}${selectedClass}"
      draggable="true"
      style="background:${courseColor(course)};color:${courseTextColor(course)}"
      ondragstart="startDrag(event, '${course.code}')"
      onclick="toggleCourse(event, '${course.code}')"
      aria-label="${course.code}, ${course.title}">
    <span class="course-pill__copy">
      <strong class="course-pill__code">${warningIcon(course, warnings)}${course.code}</strong>
      <span class="course-pill__title">${course.title}</span>
      <span class="course-pill__time">${formatTime(course)}</span>
    </span>
    <span class="course-pill__actions">
      <button class="info-button" type="button" title="Upplýsingar um áfangann" aria-label="Upplýsingar um ${course.title}" onclick="openCourseInfo(event, '${course.code}')">i</button>
      ${mainAction}
    </span>
  </article>`;
}

function renderModeSwitcher() {
  const modes = [
    ["day", "Dagskólaplan"],
    ["eve", "Kvöldskóli · 7 annir"],
    ["e4", "Kvöldskóli · 4 annir"]
  ];
  document.getElementById("mode-switcher").innerHTML = modes.map(([value, label]) =>
    `<button type="button" class="mode-button${mode === value ? " is-active" : ""}" data-mode="${value}" aria-pressed="${mode === value}" onclick="setMode('${value}')">${label}</button>`
  ).join("");
  const hero = document.querySelector(".hero");
  const scheduleCard = document.getElementById("schedule-card");
  hero.className = `card hero ${mode === "day" ? "is-day" : mode === "eve" ? "is-evening" : "is-intensive"}`;
  if (mode === "day") document.getElementById("done-card").after(scheduleCard);
  else hero.after(scheduleCard);
}

function renderProgress() {
  const completed = COURSES.filter((course) => state.done[course.code]);
  const muted = COURSES.filter((course) => state.muted[course.code]);
  const credits = completed.reduce((sum, course) => sum + course.credits, 0);
  const remaining = COURSES.filter((course) => !state.done[course.code] && !state.muted[course.code]);
  const remainingCredits = remaining.reduce((sum, course) => sum + course.credits, 0);
  document.getElementById("stats").textContent = `Búið: ${completed.length} af ${COURSES.length} (${credits} ein.) · Valið: ${muted.length} · Eftir: ${remaining.length} áfangar (${remainingCredits} ein.)`;
  document.getElementById("progress-bar").style.width = `${(completed.length / COURSES.length) * 100}%`;
}

function renderTrays(warnings) {
  const unordered = COURSES.filter((course) => !state.plan[course.code] && !state.done[course.code]);
  const done = COURSES.filter((course) => state.done[course.code] === true);
  document.getElementById("unordered").innerHTML = unordered.length
    ? unordered.map((course) => coursePill(course, true, warnings)).join("")
    : '<span class="empty-message">Allir áfangar eru á plani.</span>';
  document.getElementById("done").innerHTML = done.length
    ? done.map((course) => coursePill(course, false, warnings)).join("")
    : '<span class="empty-message">Enginn áfangi merktur búinn.</span>';
  document.getElementById("unordered-target").disabled = !selectedCourse;
  document.getElementById("done-target").disabled = !selectedCourse;
}

function renderWarnings(warnings) {
  let html = "";
  if (warnings.conflictRows.length) {
    html += `<div class="notice notice--danger">⚠ Áfangar skarast.<small>${warnings.conflictRows.map(([semester, a, b]) => `${semester}. önn: ${a} og ${b}`).join(" · ")}</small></div>`;
  }
  if (warnings.missing.size) {
    const details = [...warnings.missing].map(([code, requirements]) => `${code}: vantar ${requirements.join(", ")}`).join(" · ");
    html += `<div class="notice notice--warning">⚠ Undanfara vantar.<small>${details}</small></div>`;
  }
  if (!html) html = '<div class="notice">✓ Engir áfangar skarast og engan undanfara vantar.</div>';
  document.getElementById("warnings-curriculum").innerHTML = html;
  document.getElementById("warnings-schedule").innerHTML = html;
}

function renderCurriculum(warnings) {
  const semesters = semesterNumbers();
  const subjects = SUBJECTS.slice().sort((a, b) => SUBJECT_NAMES[a].localeCompare(SUBJECT_NAMES[b], "is"));
  const planned = COURSES.filter((course) => state.plan[course.code]);

  document.getElementById("curriculum").innerHTML = `<table class="curriculum-table">
    <thead><tr>
      <th class="subject-heading">Námsgrein</th>
      ${semesters.map((semester) => `<th class="semester-heading">
        <label title="Búinn með alla áfanga annarinnar"><input type="checkbox" ${state.semesterHistory[semester] ? "checked" : ""} onchange="markSemesterDone(${semester}, this.checked)"> Önn ${semester}</label>
        <button type="button" class="insert-semester" title="Setja nýja önn á undan" onclick="insertSemester(${semester})">+ önn á undan</button>
        <button type="button" class="semester-target" ${selectedCourse ? "" : "disabled"} onclick="placeSelected(${semester})">Færa valinn hingað</button>
      </th>`).join("")}
    </tr></thead>
    <tbody>
      ${subjects.map((subject) => `<tr>
        <th>${SUBJECT_NAMES[subject]}</th>
        ${semesters.map((semester) => `<td ondragover="allowDrop(event)" ondragleave="this.classList.remove('is-over')" ondrop="dropCourse(event, ${semester})" onclick="placeSelected(${semester})">
          ${planned.filter((course) => course.subject === subject && state.plan[course.code] === semester).map((course) => coursePill(course, true, warnings)).join("")}
        </td>`).join("")}
      </tr>`).join("")}
      <tr class="credits-row"><th>Einingar</th>${semesters.map((semester) => `<th>${planned.filter((course) => state.plan[course.code] === semester).reduce((sum, course) => sum + course.credits, 0)}</th>`).join("")}</tr>
    </tbody>
  </table>`;
}

function scheduleGridColumn(course) {
  if (course.period === "a") return `${3 + (2 * course.day)} / span 2`;
  return course.period === "1" ? `${3 + (2 * course.day)}` : `${4 + (2 * course.day)}`;
}

function coursesOverlap(a, b) {
  return a.code !== b.code
    && a.day === b.day
    && a.start <= b.end && b.start <= a.end
    && a.weekStart <= b.weekEnd && b.weekStart <= a.weekEnd;
}

function scheduleBlock(course, warnings, lane = 0, laneCount = 1) {
  const statusClass = warnings.conflicts.has(course.code)
    ? " is-conflict"
    : warnings.missing.has(course.code) ? " is-prerequisite" : "";
  const selectedClass = selectedCourse === course.code ? " is-selected" : "";
  const conflictStyle = warnings.conflicts.has(course.code)
    ? `;justify-self:start;width:calc(100% / ${laneCount} - 6px);margin-left:calc(100% * ${lane} / ${laneCount} + 3px)`
    : "";
  const weeks = course.period === "a" ? "kennt alla önnina" : `vika ${course.weekStart}–${course.weekEnd}`;

  return `<article class="schedule-block${statusClass}${selectedClass}"
      style="grid-row:${(course.start % 7) + 1}/${(course.end % 7) + 2};grid-column:${scheduleGridColumn(course)};background:${courseColor(course)}${conflictStyle}"
      draggable="true" ondragstart="startDrag(event, '${course.code}')" onclick="toggleCourse(event, '${course.code}')">
    <strong class="schedule-block__code">${warningIcon(course, warnings)}${course.code}</strong>
    <span class="schedule-block__title">${course.title}</span>
    <span class="schedule-block__weeks">${course.slots} · ${weeks}</span>
    <span class="schedule-block__time">${START_TIMES[course.start % 7]}–${END_TIMES[course.end % 7]}</span>
    <span class="schedule-block__actions">
      <button class="info-button" type="button" title="Upplýsingar" aria-label="Upplýsingar um ${course.title}" onclick="openCourseInfo(event, '${course.code}')">i</button>
      <button type="button" title="Færa (síma)" aria-label="Færa ${course.title}" aria-pressed="${selectedCourse === course.code}" onclick="pickCourse(event, '${course.code}')">⇄</button>
      <button type="button" title="Setja til hliðar" aria-label="Setja ${course.title} til hliðar" aria-pressed="${Boolean(state.muted[course.code])}" onclick="toggleCourse(event, '${course.code}')">◐</button>
      <button type="button" title="Merkja lokið" aria-label="Merkja ${course.title} lokið" onclick="event.stopPropagation(); setCourseDone('${course.code}', true)">Fjarlægja</button>
    </span>
  </article>`;
}

function renderFilters() {
  const filterButton = (key, value, label) => `<button type="button" class="${state[key] === value ? "is-active" : ""}" aria-pressed="${state[key] === value}" onclick="setOption('${key}', ${JSON.stringify(value).replaceAll('"', "'")})">${label}</button>`;
  document.getElementById("week-filters").innerHTML = `<strong>Vikur</strong>${filterButton("week", 0, "Allar")}${filterButton("week", 1, "1–8")}${filterButton("week", 2, "9–16")}`;
  document.getElementById("color-filters").innerHTML = `<strong>Litir</strong>${filterButton("colorMode", "day", "Eftir degi")}${filterButton("colorMode", "type", "Eftir gerð")}${filterButton("colorMode", "semester", "Eftir önn")}`;
}

function renderSchedule(warnings) {
  const semesters = semesterNumbers();
  const visible = COURSES.filter((course) => {
    if (!state.plan[course.code] || course.day < 0) return false;
    if (!state.week) return true;
    return state.week === 1 ? course.weekStart === 1 : course.weekEnd === 16;
  });

  const lane = {};
  const laneCount = {};
  semesters.forEach((semester) => {
    const conflicted = visible.filter((course) => state.plan[course.code] === semester && warnings.conflicts.has(course.code));
    conflicted.forEach((course) => {
      const used = new Set();
      conflicted.forEach((other) => {
        if (coursesOverlap(other, course) && lane[other.code] !== undefined) used.add(lane[other.code]);
      });
      let index = 0;
      while (used.has(index)) index += 1;
      lane[course.code] = index;
    });
    conflicted.forEach((course) => {
      let max = lane[course.code];
      conflicted.forEach((other) => { if (coursesOverlap(other, course)) max = Math.max(max, lane[other.code]); });
      laneCount[course.code] = max + 1;
    });
  });

  const header = `<div class="schedule-header">
    <div style="grid-column:1/3;grid-row:1/3"></div>
    ${DAYS.map((day, index) => `<div class="day-heading" style="grid-column:${3 + (2 * index)}/span 2;grid-row:1">${day}</div>
      <div class="week-heading" style="grid-column:${3 + (2 * index)};grid-row:2">vika 1–8</div>
      <div class="week-heading" style="grid-column:${4 + (2 * index)};grid-row:2">vika 9–16</div>`).join("")}
  </div>`;

  const semesterGrids = semesters.map((semester) => `<div class="semester-grid" ondragover="allowDrop(event)" ondragleave="this.classList.remove('is-over')" ondrop="dropCourse(event, ${semester})" onclick="placeSelected(${semester})">
    <div class="semester-label" style="grid-column:1;grid-row:1/8">
      <label title="Búinn með alla áfanga annarinnar"><input type="checkbox" ${state.semesterHistory[semester] ? "checked" : ""} onchange="markSemesterDone(${semester}, this.checked)"> ${semester}. önn</label>
      <button type="button" class="insert-semester" onclick="event.stopPropagation(); insertSemester(${semester})">+ önn á undan</button>
      <button type="button" class="semester-target" ${selectedCourse ? "" : "disabled"} onclick="event.stopPropagation(); placeSelected(${semester})">Færa valinn hingað</button>
      ${warnings.conflictRows.some(([number]) => number === semester) ? '<div class="semester-alert">⚠ Áfangar skarast</div>' : ""}
    </div>
    ${START_TIMES.map((time, index) => `<div class="time-label" style="grid-column:2;grid-row:${index + 1}">${time}–${END_TIMES[index]}</div>`).join("")}
    ${START_TIMES.map((_, row) => DAYS.map((__, day) => `<div class="grid-cell" style="grid-column:${3 + (2 * day)}/span 2;grid-row:${row + 1}"></div>`).join("")).join("")}
    ${visible.filter((course) => state.plan[course.code] === semester).map((course) => scheduleBlock(course, warnings, lane[course.code] || 0, laneCount[course.code] || 1)).join("")}
  </div>`).join("");

  document.getElementById("schedule").innerHTML = `<div class="schedule-grid">${header}${semesterGrids}</div>`;
  const weekend = COURSES.filter((course) => state.plan[course.code] && course.day < 0);
  document.getElementById("weekend-note").textContent = weekend.length
    ? `Helgarnámskeið: ${weekend.map((course) => `${course.code} – ${course.title} (${state.plan[course.code]}. önn)`).join(", ")}`
    : "";
  document.getElementById("schedule-title").textContent = mode === "day" ? "Stundatafla" : "Stundatafla í kvöldskóla";
}

function renderLegend() {
  let items;
  if (state.colorMode === "day") {
    items = DAYS.map((day, index) => [DAY_COLORS[index], day]);
  } else if (state.colorMode === "semester") {
    items = PLANS.day.map((_, index) => [semesterColor(index + 1), `${index + 1}. önn í námskrá`]);
  } else {
    items = SUBJECTS.map((subject) => [subjectColor(subject), SUBJECT_NAMES[subject]]);
  }
  items.push([DONE_COLOR, "Valið (grátt)"]);
  document.getElementById("legend").innerHTML = items.map(([color, label]) => `<span><i style="background:${color}"></i>${label}</span>`).join("");
}

function renderExport() {
  const semesters = semesterNumbers();
  document.getElementById("export-text").value = `Síða: ${mode}\n${semesters.map((semester) => `${semester}. önn: ${COURSES.filter((course) => state.plan[course.code] === semester).map((course) => course.code).join(" ")}`).join("\n")}\nÓraðað/búið: ${COURSES.filter((course) => !state.plan[course.code]).map((course) => course.code).join(" ")}`;
}

function openCourseInfo(event, code) {
  event.stopPropagation();
  const course = COURSE_BY_CODE[code];
  if (!course) return;
  document.getElementById("dialog-code").textContent = course.code;
  document.getElementById("dialog-title").textContent = course.title;
  document.getElementById("dialog-meta").textContent = `${course.credits} ${course.credits === 1 ? "eining" : "einingar"} · ${SUBJECT_NAMES[course.subject]}`;
  document.getElementById("dialog-summary").textContent = course.summary;
  document.getElementById("dialog-prerequisites").textContent = course.prerequisites;
  document.getElementById("dialog-source").href = course.source;
  const dialog = document.getElementById("course-dialog");
  if (typeof dialog.showModal === "function") dialog.showModal();
  else dialog.setAttribute("open", "");
}

function closeCourseInfo() {
  const dialog = document.getElementById("course-dialog");
  if (typeof dialog.close === "function") dialog.close();
  else dialog.removeAttribute("open");
}

function render() {
  const scrollY = window.scrollY;
  const warnings = findWarnings();
  renderModeSwitcher();
  renderProgress();
  renderWarnings(warnings);
  renderTrays(warnings);
  renderCurriculum(warnings);
  renderFilters();
  renderSchedule(warnings);
  renderLegend();
  renderExport();
  if (window.scrollY !== scrollY) window.scrollTo(0, scrollY);
}

// Clicking the translucent backdrop closes the native dialog.
document.getElementById("course-dialog").addEventListener("click", (event) => {
  if (event.target !== event.currentTarget) return;
  const bounds = event.currentTarget.getBoundingClientRect();
  const outside = event.clientX < bounds.left || event.clientX > bounds.right
    || event.clientY < bounds.top || event.clientY > bounds.bottom;
  if (outside) closeCourseInfo();
});

render();
