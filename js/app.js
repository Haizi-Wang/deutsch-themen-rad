import {
  APP,
  QUESTS,
  WHEEL_TOPICS,
  THESES,
  SCENES,
  PARTNER_FILLERS,
  NUANCE,
  LISTEN,
  PRESS,
  ZUEGE,
  SPEAKING_CRITERIA,
  WRITING_CRITERIA,
  TELC,
  TELC_PROBES,
  KI_SYSTEM,
  KI_LAUTLESEN,
  LAUTLESEN_LOCAL,
} from "./content.js?v=5";
import { PLAN, START, WEEKS, campaignIndex, dateForDay, localIso } from "./plan30.js?v=5";
import {
  canRecognize,
  canRecord,
  createRecognizer,
  speak,
  stopSpeak,
  startRecorder,
} from "./speech.js?v=5";
import { t, applyChrome, toggleLang } from "./i18n.js?v=1";

const STORAGE = "einsatz-c1-v1";
const COLORS = [
  "#c44536", "#e07a3d", "#e9b44c", "#7ba05b",
  "#2a9d8f", "#3d7ea6", "#4c5fd7", "#6f42c1",
  "#b5179e", "#d6409f", "#7d5260", "#8d6e4c",
];

const $ = (sel) => document.querySelector(sel);
const view = $("#view");
const dayKey = () => localIso();
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
let viewN = null;
let timerHandle = null;

function formatClock(secs) {
  const m = String(Math.floor(Math.max(0, secs) / 60)).padStart(2, "0");
  const s = String(Math.max(0, secs) % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function startCountdown(el, secs, onend) {
  clearInterval(timerHandle);
  let left = secs;
  const tick = () => {
    if (!el) return;
    el.textContent = formatClock(left);
    if (left <= 0) {
      clearInterval(timerHandle);
      speak("Zeit.");
      onend?.();
      return;
    }
    left -= 1;
  };
  tick();
  timerHandle = setInterval(tick, 1000);
}

function campN() {
  return campaignIndex(dayKey());
}

function packAt(n) {
  if (n < 1 || n > PLAN.length) return null;
  return { n, date: dateForDay(n), ...PLAN[n - 1] };
}

function activeN() {
  if (viewN >= 1 && viewN <= 30) return viewN;
  const n = campN();
  if (n < 1) return 1;
  if (n > 30) return 30;
  return n;
}

function activePack() {
  return packAt(activeN());
}

function isFutureDay(n) {
  return n > campN();
}

function sceneById(id) {
  return SCENES.find((s) => s.id === id) || SCENES[0];
}

function dayDone(n) {
  const d = state.camp?.[n]?.done || {};
  return QUESTS.every((q) => d[q.id]);
}

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE)) || {};
  } catch {
    return {};
  }
}

function save(state) {
  localStorage.setItem(STORAGE, JSON.stringify(state));
}

function yesterdayKey() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return localIso(d);
}

function campDayComplete(st, n) {
  const d = st.camp?.[n]?.done || {};
  return QUESTS.every((q) => d[q.id]);
}

function ensureDay(state) {
  const today = dayKey();
  state.camp ||= {};
  state.xp ||= 0;
  state.streak ||= 0;
  if (state.today !== today) {
    if (state.today) {
      const prevN = campaignIndex(state.today);
      const all = prevN >= 1 && prevN <= 30
        ? campDayComplete(state, prevN)
        : QUESTS.every((q) => state.done?.[q.id]);
      state.streak = all && state.today === yesterdayKey() ? (state.streak || 0) + 1 : 0;
    }
    state.today = today;
  }
  const n = campaignIndex(today);
  if (n >= 1 && n <= 30) {
    state.camp[n] ||= { done: {} };
    state.done = { ...state.camp[n].done };
  } else {
    state.done ||= {};
  }
  return state;
}

let state = ensureDay(load());
save(state);

function complete(id) {
  const n = campN();
  if (n < 1 || n > 30) return;
  if (isFutureDay(activeN()) && activeN() !== n) return;
  if (!state.done[id]) {
    state.done[id] = true;
    const q = QUESTS.find((x) => x.id === id);
    state.xp += q ? q.xp : 10;
    state.camp[n] ||= { done: {} };
    state.camp[n].done[id] = true;
    save(state);
  }
  renderHud();
}

function renderHud() {
  const n = campN();
  const todayQ = QUESTS.filter((q) => state.done[q.id]).length;
  const daysDone = PLAN.filter((_, i) => campDayComplete(state, i + 1)).length;
  $("#xpChip").innerHTML = `${t("xp")} <strong>${state.xp}</strong>`;
  $("#streakChip").innerHTML = `${t("serie")} <strong>${state.streak}</strong>`;
  if (n < 1) {
    $("#dayChip").innerHTML = `${t("startOn")} <strong>30.10.</strong>`;
    $("#barFill").style.width = "0%";
  } else if (n > 30) {
    $("#dayChip").innerHTML = `${t("fertig")} <strong>${daysDone}/30</strong>`;
    $("#barFill").style.width = `${(daysDone / 30) * 100}%`;
  } else {
    $("#dayChip").innerHTML = `${t("tag")} <strong>${n}/30</strong> · ${todayQ}/${QUESTS.length}`;
    $("#barFill").style.width = `${(n / 30) * 100}%`;
  }
}

function navActive(route) {
  document.querySelectorAll(".nav a").forEach((a) => {
    a.classList.toggle("active", a.dataset.route === route);
  });
}

function route() {
  state = ensureDay(load());
  save(state);
  applyChrome();
  renderHud();
  const raw = (location.hash || "#/plan").replace(/^#\/?/, "");
  const parts = (raw || "plan").split("/");
  const hash = parts[0];
  viewN = hash === "tag" ? Number(parts[1]) : hash === "heute" ? campN() : null;
  navActive(["plan", "heute", "sprechen", "pruefung", "feinschliff", "hoeren", "zeitung", "zuege", "einstellungen"].includes(hash)
    ? hash
    : hash === "gespraech" ? "sprechen" : "plan");
  stopSpeak();
  clearInterval(timerHandle);
  const map = {
    plan: renderPlan,
    heute: renderHome,
    sprechen: renderSpeakHub,
    tagebuch: renderDiary,
    duell: renderDuell,
    gespraech: () => renderTalk(false),
    pruefung: () => renderTalk(true),
    feinschliff: renderNuance,
    schreiben: renderWrite,
    hoeren: renderListen,
    zeitung: renderZeitung,
    zuege: renderZuege,
    woerter: renderZuege,
    einstellungen: renderSettings,
    tag: renderHome,
  };
  (map[hash] || renderPlan)();
}

function backLink(to = "heute") {
  return `<div class="toolbar"><button class="btn ghost small" type="button" data-go="${to}">${t("back")}</button></div>`;
}

function criteriaList(items) {
  return `<ul class="list criteria">${items.map((x) => `<li>${x}</li>`).join("")}</ul>`;
}

function calendarHtml(active = activeN()) {
  const now = campN();
  return `<div class="cal" role="list">${PLAN.map((p, i) => {
    const n = i + 1;
    const future = now >= 1 && n > now;
    const cls = [
      "cal-day",
      n === now ? "today" : "",
      n === active ? "active" : "",
      campDayComplete(state, n) ? "done" : "",
      future ? "locked" : "",
    ].join(" ");
    return `<a class="${cls}" href="#/tag/${n}" role="listitem">
      <span class="n">${n}</span>
      <span class="sub">${dateForDay(n).slice(5)} · ${p.title}</span>
    </a>`;
  }).join("")}</div>`;
}

function weeksHtml() {
  return `<div class="weeks">${WEEKS.map((w) => `
    <article class="week">
      <p class="kicker">${t("woche", { n: w.n })}</p>
      <h3>${t("week" + w.n)}</h3>
      <p class="hint">${t("week" + w.n + "Lede")} ${t("weekDays", { a: w.days[0], b: w.days[1] })}</p>
    </article>`).join("")}</div>`;
}

function pressFor(p) {
  return PRESS[(p.n - 1) % PRESS.length];
}

function briefingHtml(p, { preview = false } = {}) {
  const n = campN();
  const future = isFutureDay(p.n);
  const wait = n < 1;
  const press = pressFor(p);
  return `
    <section class="hero">
      <p class="kicker">${t("briefingDay", { n: p.n, date: p.date })}</p>
      <h2>${p.title}</h2>
      <p class="lede">${p.focus}</p>
      ${p.boss ? `<p class="hint"><strong>${t("boss")}:</strong> ${p.boss}</p>` : ""}
      ${wait ? `<p class="hint">${t("previewStart")}</p>` : ""}
      ${future && !wait ? `<p class="hint">${t("dayLocked")}</p>` : ""}
    </section>
    <ul class="list">
      <li><strong>${t("labDiary")}:</strong> ${p.diary}</li>
      <li><strong>${t("labDuell")}:</strong> ${p.thesis}</li>
      <li><strong>${t("labScene")}:</strong> ${sceneById(p.scene).title}</li>
      <li><strong>${t("labPress")}:</strong> ${t("pressLine", { outlet: press.outlet, genre: press.genre, title: press.title })}</li>
      <li><strong>${t("labWrite")}:</strong> ${p.writeTitle}</li>
      ${p.boss ? `<li><strong>${t("boss")}:</strong> ${p.boss}</li>` : ""}
    </ul>
    ${preview || wait || future ? "" : ""}`;
}

function questCards(p) {
  const n = campN();
  const frozen = n < 1 || isFutureDay(p.n);
  const doneMap = p.n === n ? state.done : (state.camp?.[p.n]?.done || {});
  return `<div class="grid">${QUESTS.map((q) => {
    const done = Boolean(doneMap[q.id]);
    return `
      <button class="card ${done ? "done" : ""}" type="button" data-go="${frozen ? "plan" : q.route}" ${frozen ? "disabled" : ""}>
        <p class="kicker">${t("q_" + q.id + "_k")}</p>
        <h2>${t("q_" + q.id + "_t")}</h2>
        <p>${t("q_" + q.id + "_b")}</p>
        <div class="meta">
          <span>${t("questMinXp", { min: q.minutes, xp: q.xp })}</span>
          <span class="badge">${frozen ? t("badgeFrom") : done ? t("badgeDone") : t("badgeOpen")}</span>
        </div>
      </button>`;
  }).join("")}</div>`;
}

function renderPlan() {
  viewN = campN() < 1 ? 1 : Math.min(Math.max(campN(), 1), 30);
  const p = packAt(viewN);
  view.innerHTML = `
    <section class="hero">
      <p class="kicker">${APP.name}</p>
      <h2>${t("planH2")}</h2>
      <p class="lede">${t("planLede", { start: START })}</p>
    </section>
    ${weeksHtml()}
    ${calendarHtml(viewN)}
    ${briefingHtml(p, { preview: campN() < 1 })}
    <div class="row">
      <a class="btn" href="#/heute">${t("toToday")}</a>
      <a class="btn ghost" href="#/pruefung">${t("telcFlow")}</a>
    </div>`;
}

function renderHome() {
  const p = packAt(activeN()) || packAt(1);
  const now = campN();
  view.innerHTML = `
    ${briefingHtml(p)}
    ${calendarHtml(p.n)}
    ${now < 1 ? `<p class="note">${t("cardsFrom", { start: START })}</p>` : questCards(p)}`;
}

function renderSpeakHub() {
  if (trainingLocked()) return;
  view.innerHTML = `
    <section class="hero">
      <p class="kicker">${t("speakKicker")}</p>
      <h2>${t("speakH2")}</h2>
      <p class="lede">${t("speakLede")}</p>
    </section>
    <div class="row">
      <button class="btn" data-go="tagebuch">${t("btnDiary")}</button>
      <button class="btn" data-go="duell">${t("btnDuell")}</button>
      <button class="btn" data-go="gespraech">${t("btnTalk")}</button>
      <button class="btn" data-go="pruefung">${t("btnTelc")}</button>
      <button class="btn" data-go="zeitung">${t("btnPress")}</button>
      <button class="btn" data-go="zuege">${t("btnZuege")}</button>
    </div>
    <p class="note">${canRecord() ? t("recReady") : t("recNoMic")} ${canRecognize() ? t("recLive") : t("recNoLive")}</p>
    ${criteriaList(SPEAKING_CRITERIA)}`;
}

function bindRecorder(logEl, onstop, onstart) {
  let session = null;
  $("#recBtn")?.addEventListener("click", async () => {
    const btn = $("#recBtn");
    if (!session) {
      try {
        session = await startRecorder();
        btn.textContent = t("recStop");
        logEl.textContent = t("recRunning");
        onstart?.();
      } catch {
        logEl.textContent = t("recDenied");
      }
      return;
    }
    const blob = await session.stop();
    session = null;
    btn.textContent = t("recAgain");
    const url = URL.createObjectURL(blob);
    onstop(url);
  });
}

function trainingLocked() {
  if (campN() >= 1) return false;
  view.innerHTML = `
    <section class="panel">
      ${backLink("plan")}
      <p class="kicker">${t("notYet")}</p>
      <h2>${t("lockH2")}</h2>
      <p class="lede">${t("lockLede")}</p>
      <div class="row"><a class="btn" href="#/plan">${t("openPlan")}</a></div>
    </section>`;
  return true;
}

function renderDiary() {
  if (trainingLocked()) return;
  const pack = activePack();
  const p = { hook: pack.diary, followups: pack.followups };
  view.innerHTML = `
    <section class="panel">
      ${backLink()}
      <p class="kicker">${t("btnDiary")}</p>
      <p class="prompt">${p.hook}</p>
      <p class="hint">${t("diaryHint")}</p>
      <div class="row">
        <button class="btn" id="recBtn" type="button">${t("recStart")}</button>
        <button class="btn ghost" id="nextQ" type="button">${t("nextFollow")}</button>
        <button class="btn ghost" id="doneBtn" type="button">${t("checkQuest")}</button>
      </div>
      <audio id="player" class="hidden" controls></audio>
      <p class="live" id="follow">${p.followups[0]}</p>
    </section>`;
  let n = 0;
  bindRecorder($("#follow"), (url) => {
    const a = $("#player");
    a.src = url;
    a.classList.remove("hidden");
  });
  $("#nextQ").onclick = () => {
    n = (n + 1) % p.followups.length;
    $("#follow").textContent = p.followups[n];
    speak(p.followups[n], { rate: 1.02 });
  };
  $("#doneBtn").onclick = () => {
    complete("mundtagebuch");
    location.hash = "#/heute";
  };
}

function renderDuell() {
  if (trainingLocked()) return;
  const pack = activePack();
  view.innerHTML = `
    <section class="panel">
      ${backLink("sprechen")}
      <p class="kicker">${t("btnDuell")}</p>
      <h2>${t("duellH2")}</h2>
      <div class="row">
        <button class="btn" id="spinBtn" type="button">${t("spin")}</button>
        <button class="btn ghost" id="thesisBtn" type="button">${t("newThesis")}</button>
      </div>
      <div class="wheel-wrap" id="wheelWrap"></div>
      <p class="kicker" style="margin-top:16px">${t("yourTopic")}</p>
      <p class="prompt" id="topicName">${pack.topic}</p>
      <p class="hint" id="topicHint">${pack.hint}</p>
      <p class="prompt" id="thesis">${pack.thesis}</p>
      <p class="timer" id="timer">00:45</p>
      <div class="row">
        <button class="btn small" id="think" type="button">${t("think45")}</button>
        <button class="btn small" id="pro" type="button">${t("pro2")}</button>
        <button class="btn small" id="con" type="button">${t("con90")}</button>
        <button class="btn" id="recBtn" type="button">${t("recShort")}</button>
        <button class="btn ghost" id="doneBtn" type="button">${t("checkQuest")}</button>
      </div>
      <audio id="player" class="hidden" controls></audio>
    </section>`;
  mountWheel();
  $("#thesisBtn").onclick = () => {
    $("#thesis").textContent = pick(THESES);
  };
  $("#think").onclick = () => startCountdown($("#timer"), 45);
  $("#pro").onclick = () => startCountdown($("#timer"), 120);
  $("#con").onclick = () => startCountdown($("#timer"), 90);
  bindRecorder($("#topicHint"), (url) => {
    const a = $("#player");
    a.src = url;
    a.classList.remove("hidden");
  });
  $("#doneBtn").onclick = () => {
    complete("denkduell");
    location.hash = "#/heute";
  };
}

function mountWheel() {
  const CX = 200, CY = 200, RADIUS = 178;
  const SLICE = 360 / WHEEL_TOPICS.length;
  const polar = (deg, r) => {
    const rad = (deg * Math.PI) / 180;
    return [CX + r * Math.sin(rad), CY - r * Math.cos(rad)];
  };
  const slices = WHEEL_TOPICS.map((topic, i) => {
    const mid = i * SLICE + SLICE / 2;
    const [lx, ly] = polar(mid, 118);
    const start = i * SLICE;
    const end = start + SLICE;
    const [x1, y1] = polar(start, RADIUS);
    const [x2, y2] = polar(end, RADIUS);
    const d = `M ${CX} ${CY} L ${x1} ${y1} A ${RADIUS} ${RADIUS} 0 0 1 ${x2} ${y2} Z`;
    return `<path d="${d}" fill="${COLORS[i]}" /><text class="slice-label" x="${lx}" y="${ly}" text-anchor="middle" dominant-baseline="middle">${topic.label}</text>`;
  }).join("");
  $("#wheelWrap").innerHTML = `
    <svg viewBox="0 0 400 400" role="img" aria-label="${t("wheelAria")}">
      <circle cx="200" cy="200" r="190" fill="#f6f1ea" />
      ${slices}
      <circle class="hub" cx="200" cy="200" r="28" />
      <g class="pointer" id="pointer">
        <polygon points="200,46 214,118 200,108 186,118" fill="#f3c16b" stroke="#1a1208" stroke-width="2" />
        <circle cx="200" cy="200" r="14" fill="#f3c16b" stroke="#1a1208" stroke-width="3" />
      </g>
    </svg>`;
  const pointer = $("#pointer");
  const spinBtn = $("#spinBtn");
  let rotation = 0;
  let busy = false;
  spinBtn.addEventListener("click", () => {
    if (busy) return;
    busy = true;
    spinBtn.disabled = true;
    const index = Math.floor(Math.random() * WHEEL_TOPICS.length);
    const extraTurns = 5 + Math.floor(Math.random() * 4);
    const landing = index * SLICE + SLICE / 2;
    const currentMod = ((rotation % 360) + 360) % 360;
    let delta = (landing - currentMod + 360) % 360;
    if (delta < 20) delta += 360;
    rotation += extraTurns * 360 + delta;
    pointer.classList.add("spinning");
    pointer.style.transform = `rotate(${rotation}deg)`;
    window.setTimeout(() => {
      const topic = WHEEL_TOPICS[index];
      $("#topicName").textContent = topic.name;
      $("#topicHint").textContent = topic.hint;
      $("#thesis").textContent = pick(THESES);
      pointer.classList.remove("spinning");
      spinBtn.disabled = false;
      busy = false;
    }, 4300);
  });
}

function renderTalk(forceExam = false) {
  if (!forceExam && trainingLocked()) return;
  const pack = campN() >= 1 ? activePack() : packAt(1);
  const scene = sceneById(forceExam ? "pruefung" : pack.scene);
  const exam = scene.id === "pruefung";
  const thesis = pack.thesis;
  view.innerHTML = `
    <section class="panel">
      ${backLink(forceExam ? "plan" : "sprechen")}
      <p class="kicker">${scene.title}</p>
      <h2>${scene.role}</h2>
      <p class="hint">${t("registerHint", { reg: scene.register })}</p>
      ${exam ? `
        <p class="prompt">${thesis}</p>
        <div class="row">
          <button class="btn small" id="telcOff" type="button">${t("telcOff")}</button>
          <button class="btn ghost small" id="telcKurz" type="button">${t("telcKurz")}</button>
        </div>
        <div class="phases" id="phases"></div>
        <p class="timer" id="telcTimer">20:00</p>
        <p class="hint" id="phaseHint"></p>
        <div class="row">
          <button class="btn small" id="phaseStart" type="button">${t("phaseStart")}</button>
          <button class="btn ghost small" id="phaseNext" type="button">${t("phaseNext")}</button>
        </div>
      ` : ""}
      <div class="chat" id="chat"></div>
      <textarea id="you" placeholder="${t("placeholderReply")}"></textarea>
      <div class="row">
        <button class="btn" id="send" type="button">${t("say")}</button>
        <button class="btn ghost" id="listenBtn" type="button">${t("listenMic")}</button>
        <button class="btn" id="recBtn" type="button">${t("recShort")}</button>
        <button class="btn ghost" id="ki" type="button">${t("kiFeel")}</button>
        <button class="btn" id="doneBtn" type="button">${t("checkQuest")}</button>
      </div>
      <audio id="player" class="hidden" controls></audio>
      <p class="note" id="status"></p>
    </section>`;
  const chat = $("#chat");
  const push = (who, text) => {
    const div = document.createElement("div");
    div.className = `bubble ${who}`;
    div.textContent = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
  };
  let step = 0;
  let mode = "official";
  let phase = 0;
  const phases = () => TELC[mode];
  const current = () => phases()[phase];
  const localReply = () => {
    const list = exam
      ? (TELC_PROBES[current().id] || scene.probes)
      : scene.probes;
    const filler = pick(PARTNER_FILLERS);
    const probe = list[step % list.length];
    step += 1;
    return `${filler} ${probe}`;
  };
  const paintPhases = () => {
    if (!exam) return;
    $("#phases").innerHTML = phases().map((p, i) =>
      `<button class="phase ${i === phase ? "on" : ""}" type="button" data-phase="${i}">${p.label} ${formatClock(p.secs)}</button>`
    ).join("");
    $("#phaseHint").textContent = current().hint;
    $("#telcTimer").textContent = formatClock(current().secs);
    $("#phases").querySelectorAll("[data-phase]").forEach((btn) => {
      btn.onclick = () => setPhase(Number(btn.dataset.phase));
    });
  };
  const setPhase = (i) => {
    phase = Math.max(0, Math.min(i, phases().length - 1));
    step = 0;
    paintPhases();
    const p = current();
    const line = p.id === "vorbereitung"
      ? t("prepLine", { thesis })
      : p.id === "praesentation"
        ? t("presLine")
        : p.id === "nachfragen"
          ? t("askLine")
          : t("discLine");
    push("them", line);
    speak(line, { rate: 1.02 });
  };
  const submit = async (text) => {
    const t = text.trim();
    if (!t) return;
    if (exam && !current().partner) {
      push("you", t);
      $("#you").value = "";
      $("#status").textContent = current().id === "vorbereitung"
        ? t("prepNote")
        : t("presNote");
      return;
    }
    push("you", t);
    $("#you").value = "";
    const useKi = $("#ki").dataset.on === "1";
    if (useKi) {
      $("#status").textContent = t("kiListening");
      try {
        const reply = await kiChat(scene, transcriptFrom(chat), t, exam ? current().id : "");
        push("them", reply);
        speak(reply, { rate: 1.05 });
        $("#status").textContent = "";
        return;
      } catch (e) {
        $("#status").textContent = t("kiFail") + e.message;
      }
    }
    const reply = localReply();
    push("them", reply);
    speak(reply, { rate: 1.05 });
  };
  if (exam) {
    paintPhases();
    push("them", t("telcOpen", { thesis, hint: current().hint }));
    const syncModeBtns = () => {
      $("#telcOff").classList.toggle("ghost", mode !== "official");
      $("#telcKurz").classList.toggle("ghost", mode !== "kurz");
    };
    $("#telcOff").onclick = () => { mode = "official"; phase = 0; paintPhases(); syncModeBtns(); };
    $("#telcKurz").onclick = () => { mode = "kurz"; phase = 0; paintPhases(); syncModeBtns(); };
    $("#phaseStart").onclick = () => startCountdown($("#telcTimer"), current().secs, () => {
      if (phase < phases().length - 1) setPhase(phase + 1);
    });
    $("#phaseNext").onclick = () => setPhase(phase + 1);
  } else {
    push("them", scene.opening);
    speak(scene.opening, { rate: 1.05 });
  }
  bindRecorder($("#status"), (url) => {
    const a = $("#player");
    a.src = url;
    a.classList.remove("hidden");
  });
  $("#send").onclick = () => submit($("#you").value);
  $("#you").addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit($("#you").value);
    }
  });
  let rec = null;
  let acc = "";
  $("#listenBtn").onclick = () => {
    if (!canRecognize()) {
      $("#status").textContent = t("noSpeech");
      return;
    }
    if (rec) {
      rec.stop();
      rec = null;
      $("#listenBtn").textContent = t("listenMic");
      if (acc) submit(acc);
      acc = "";
      return;
    }
    rec = createRecognizer({
      onresult({ interim, finalText }) {
        if (finalText) acc += ` ${finalText}`;
        $("#you").value = (acc + " " + interim).trim();
      },
      onend() {
        rec = null;
        $("#listenBtn").textContent = t("listenMic");
      },
      onerror() {
        $("#status").textContent = t("recAbort");
      },
    });
    rec.start();
    $("#listenBtn").textContent = t("listenRunning");
  };
  $("#ki").onclick = () => {
    const on = $("#ki").dataset.on === "1";
    $("#ki").dataset.on = on ? "0" : "1";
    $("#ki").textContent = on ? t("kiFeel") : t("kiOn");
  };
  $("#doneBtn").onclick = () => {
    complete("gespraech");
    location.hash = "#/heute";
  };
}

function transcriptFrom(chatEl) {
  return [...chatEl.children].map((el) => {
    const role = el.classList.contains("them") ? "partner" : "user";
    return `${role}: ${el.textContent}`;
  }).join("\n");
}

async function kiChat(scene, history, last, phase = "") {
  const key = load().openaiKey || "";
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      apiKey: key,
      messages: [
        {
          role: "system",
          content: `${KI_SYSTEM}

Rolle: ${scene.role}. Register: ${scene.register}. Szene: ${scene.title}.
${phase ? `Prüfungsteil: ${phase}. In Vorbereitung/Präsentation keine inhaltliche Bewertung, höchstens eine So-eher-Variante.` : ""}`,
        },
        { role: "user", content: `Bisher:\n${history}\n\nLetzte Äußerung:\n${last}` },
      ],
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err.slice(0, 180));
  }
  const data = await res.json();
  return data.reply;
}

function localLautlesenNote(item, transcript) {
  const seed = ((transcript || "").length + item.title.length + item.outlet.length) % LAUTLESEN_LOCAL.length;
  const picks = [0, 3, 5].map((off) => LAUTLESEN_LOCAL[(seed + off) % LAUTLESEN_LOCAL.length]);
  const head = (transcript || "").trim()
    ? "Zum Transkript — ohne Note, nur Klang:"
    : `Kein Key oder kein Transkript. Typische C1-Lautlese-Haltung, ${item.outlet} · ${item.genre}:`;
  return `${head}\n\n${picks.map((p) => `So eher: ${p.line}\nKlang: ${p.sound}`).join("\n\n")}`;
}

async function kiPressChat(pack, item, transcript) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      apiKey: load().openaiKey || "",
      messages: [
        {
          role: "system",
          content: `${KI_SYSTEM}

${KI_LAUTLESEN}`,
        },
        {
          role: "user",
          content: `Tag ${pack.n}. Quelle: ${item.outlet}, Genre: ${item.genre}, Aufgabe: ${item.title}.
Lautlesen: ${item.read}
Pointe danach: ${item.followup}
Link: ${item.url}

Transkript (Web Speech oder getippt, kann lückenhaft sein):
${(transcript || "").trim() || "(leer — keine Bewertung des Inhalts, nur typische Lautlese-Haltung: Monotonie, Lehrbuchrhythmus, Wortakzent, fehlende Verschleifung.)"}`,
        },
      ],
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err.slice(0, 180));
  }
  const data = await res.json();
  return data.reply;
}

function renderNuance() {
  if (trainingLocked()) return;
  const items = activePack().nuance.map((i) => NUANCE[i % NUANCE.length]);
  view.innerHTML = `
    <section class="panel" id="nuPanel">
      ${backLink()}
      <p class="kicker">${t("nuKicker")}</p>
      <h2>${t("nuH2")}</h2>
      <p class="hint">${t("nuHint")}</p>
      <p class="prompt" id="nuTask"></p>
      <p class="live" id="nuOff"></p>
      <textarea id="nuYou" placeholder="${t("nuPlaceholder")}"></textarea>
      <div class="row">
        <button class="btn" id="reveal" type="button">${t("nuReveal")}</button>
        <button class="btn ghost" id="next" type="button">${t("nuNext")}</button>
        <button class="btn" id="doneBtn" type="button">${t("checkQuest")}</button>
      </div>
      <div id="nuWhy" class="hint"></div>
    </section>`;
  let i = 0;
  const show = () => {
    const it = items[i];
    $("#nuPanel .kicker").textContent = t("nuTag", { tag: it.tag });
    $("#nuTask").textContent = it.task;
    $("#nuOff").textContent = t("nuOff") + it.off;
    $("#nuYou").value = "";
    $("#nuWhy").innerHTML = "";
  };
  show();
  $("#reveal").onclick = () => {
    const it = items[i];
    $("#nuWhy").innerHTML = `<ul class="list">${it.natives.map((n) => `<li>${n}</li>`).join("")}</ul><p class="note">${it.why}</p>`;
  };
  $("#next").onclick = () => {
    i = (i + 1) % items.length;
    show();
  };
  $("#doneBtn").onclick = () => {
    complete("feinschliff");
    location.hash = "#/heute";
  };
}

function renderWrite() {
  if (trainingLocked()) return;
  const pack = activePack();
  const p = { title: pack.writeTitle, prompt: pack.write };
  view.innerHTML = `
    <section class="panel">
      ${backLink()}
      <p class="kicker">${t("writeKicker", { title: p.title })}</p>
      <p class="prompt">${p.prompt}</p>
      ${criteriaList(WRITING_CRITERIA)}
      <textarea id="draft"></textarea>
      <p class="hint" id="count">${t("words", { n: 0 })}</p>
      <div class="row">
        <button class="btn" id="doneBtn" type="button">${t("checkQuest")}</button>
      </div>
    </section>`;
  const draft = $("#draft");
  draft.oninput = () => {
    const n = draft.value.trim() ? draft.value.trim().split(/\s+/).length : 0;
    $("#count").textContent = t("words", { n }) + (n >= 180 && n <= 220 ? t("wordsOk") : "");
  };
  $("#doneBtn").onclick = () => {
    complete("schreibsprint");
    location.hash = "#/heute";
  };
}

function renderListen() {
  if (trainingLocked()) return;
  const item = LISTEN[activePack().listen % LISTEN.length];
  view.innerHTML = `
    <section class="panel">
      ${backLink()}
      <p class="kicker">${t("listenKicker")}</p>
      <h2>${item.name}</h2>
      <p class="lede">${item.why}</p>
      <p class="prompt">${item.task}</p>
      <p><a href="${item.url}" target="_blank" rel="noopener">${t("openSource")}</a></p>
      <div class="sources">
        ${LISTEN.map((x) => `<a href="${x.url}" target="_blank" rel="noopener"><strong>${x.name}</strong><br><span class="hint">${x.why}</span></a>`).join("")}
      </div>
      <textarea placeholder="${t("listenPlaceholder")}"></textarea>
      <div class="row">
        <button class="btn" id="doneBtn" type="button">${t("checkQuest")}</button>
      </div>
    </section>`;
  $("#doneBtn").onclick = () => {
    complete("ohr");
    location.hash = "#/heute";
  };
}

function renderZeitung() {
  const wait = campN() < 1;
  const pack = wait ? packAt(1) : activePack();
  const item = pressFor(pack);
  view.innerHTML = `
    <section class="panel">
      ${backLink(wait ? "plan" : "heute")}
      <p class="kicker">${t("pressKicker", { n: pack.n, outlet: item.outlet, genre: item.genre })}</p>
      <h2>${item.title}</h2>
      <p class="lede">${t("pressLede")}</p>
      ${wait ? `<p class="hint">${t("pressPreview")}</p>` : ""}
      <p class="prompt">${item.read}</p>
      <p class="hint"><strong>${t("thereafter")}:</strong> ${item.followup}</p>
      <p><a href="${item.url}" target="_blank" rel="noopener">${t("openArticle", { outlet: item.outlet })}</a></p>
      <p class="timer" id="timer">10:00</p>
      <div class="row">
        <button class="btn small" id="t10" type="button">${t("t10")}</button>
        <button class="btn ghost small" id="t7" type="button">${t("t7")}</button>
        <button class="btn ghost small" id="t3" type="button">${t("t3")}</button>
        <button class="btn" id="recBtn" type="button">${t("recShort")}</button>
        <button class="btn ghost" id="kiBtn" type="button">${t("kiFix")}</button>
        <button class="btn ghost" id="doneBtn" type="button">${t("checkQuest")}</button>
      </div>
      <audio id="player" class="hidden" controls></audio>
      <textarea id="pressTranscript" placeholder="${t("pressPlaceholder")}"></textarea>
      <p class="note" id="pressNote">${canRecognize() ? t("pressNoteLive") : t("pressNoteType")}${t("noScore")}</p>
      <div class="live" id="kiBox">${t("pressEmpty")}</div>
    </section>`;
  $("#t10").onclick = () => startCountdown($("#timer"), 600);
  $("#t7").onclick = () => startCountdown($("#timer"), 420);
  $("#t3").onclick = () => startCountdown($("#timer"), 180);
  let listen = null;
  let acc = "";
  const box = $("#kiBox");
  const ta = $("#pressTranscript");
  const note = $("#pressNote");
  const stopListen = () => {
    if (!listen) return;
    try { listen.stop(); } catch { /* already stopped */ }
    listen = null;
  };
  const paintLive = (interim = "") => {
    ta.value = `${acc} ${interim}`.trim();
  };
  const startListen = () => {
    if (!canRecognize() || listen) return;
    acc = ta.value.trim() ? `${ta.value.trim()} ` : "";
    listen = createRecognizer({
      onresult({ interim, finalText }) {
        if (finalText) acc += `${finalText} `;
        paintLive(interim);
      },
      onend() {
        listen = null;
      },
      onerror() {
        note.textContent = t("pressAbort");
      },
    });
    listen?.start();
  };
  const runKi = async () => {
    const transcript = ta.value.trim();
    box.textContent = t("pressKi");
    try {
      const reply = await kiPressChat(pack, item, transcript);
      box.textContent = reply;
      speak(reply, { rate: 0.95 });
    } catch (e) {
      const local = localLautlesenNote(item, transcript);
      box.textContent = `${local}${t("pressLocal", { msg: e.message })}`;
      speak(local.split("\n").filter((l) => l.startsWith("So eher:")).slice(0, 2).join(" "), { rate: 0.95 });
    }
  };
  bindRecorder(note, (url) => {
    const a = $("#player");
    a.src = url;
    a.classList.remove("hidden");
    stopListen();
    paintLive();
    runKi();
  }, startListen);
  $("#kiBtn").onclick = () => {
    stopListen();
    runKi();
  };
  $("#doneBtn").onclick = () => {
    if (!wait) complete("zeitung");
    location.hash = wait ? "#/plan" : "#/heute";
  };
}

function renderZuege() {
  if (trainingLocked()) return;
  const pack = activePack();
  const three = pack.zuege.map((i) => ZUEGE[i % ZUEGE.length]);
  const thesis = pack.thesis;
  view.innerHTML = `
    <section class="panel">
      ${backLink("sprechen")}
      <p class="kicker">${t("zuegeKicker")}</p>
      <h2>${t("zuegeH2")}</h2>
      <p class="lede">${t("zuegeLede")}</p>
      <p class="prompt">${thesis}</p>
      <div class="zuege">
        ${three.map((z) => `
          <article class="zug">
            <p class="fn">${z.fn}</p>
            <p class="chunk">${z.chunk}</p>
            <p class="ban">${z.ban}</p>
          </article>`).join("")}
      </div>
      <p class="hint">${t("zuegeHint")}</p>
      <div class="row">
        <button class="btn" id="recBtn" type="button">${t("recShort")}</button>
        <button class="btn ghost" id="coach" type="button">${t("coach")}</button>
        <button class="btn" id="doneBtn" type="button">${t("checkQuest")}</button>
      </div>
      <audio id="player" class="hidden" controls></audio>
      <div id="coachBox" class="hint"></div>
    </section>`;
  bindRecorder($("#coachBox"), (url) => {
    const a = $("#player");
    a.src = url;
    a.classList.remove("hidden");
  });
  $("#coach").onclick = () => {
    $("#coachBox").innerHTML = `<ul class="list">${three.map((z) => `<li><strong>${z.chunk}</strong> — ${z.load}</li>`).join("")}</ul>
      <p class="note">${t("coachNote")}</p>`;
    speak(three.map((z) => z.chunk).join(" "), { rate: 0.95 });
  };
  $("#doneBtn").onclick = () => {
    complete("zuege");
    location.hash = "#/heute";
  };
}

function renderSettings() {
  const s = load();
  view.innerHTML = `
    <section class="panel">
      ${backLink()}
      <p class="kicker">${t("setupKicker")}</p>
      <h2>${t("setupH2")}</h2>
      <p class="lede">${t("setupLede")}</p>
      <label>${t("apiKey")}
        <input id="key" type="password" value="${s.openaiKey || ""}" autocomplete="off" />
      </label>
      <div class="row">
        <button class="btn" id="save" type="button">${t("save")}</button>
        <button class="btn ghost" id="reset" type="button">${t("reset")}</button>
      </div>
      <p class="note" id="msg"></p>
    </section>`;
  $("#save").onclick = () => {
    state = ensureDay(load());
    state.openaiKey = $("#key").value.trim();
    save(state);
    $("#msg").textContent = t("saved");
  };
  $("#reset").onclick = () => {
    localStorage.removeItem(STORAGE);
    state = ensureDay({});
    save(state);
    renderHud();
    $("#msg").textContent = t("resetDone");
  };
}

document.body.addEventListener("click", (e) => {
  const go = e.target.closest("[data-go]");
  if (!go) return;
  location.hash = `#/${go.dataset.go}`;
});

window.addEventListener("hashchange", route);
$("#langBtn")?.addEventListener("click", () => {
  toggleLang();
  applyChrome();
  renderHud();
  route();
});
applyChrome();
renderHud();
route();
window.speechSynthesis?.getVoices();
