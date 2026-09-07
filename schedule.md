---
title: Расписание
description: Расписание занятий по C++ на осенний семестр 2026/27 учебного года.
toc: false
sidebar: false
page-navigation: false
---

Расписание на осенний семестр 2026/27 учебного года. Время — московское (МСК).

::: {.column-page}

```{=html}
<style>
.sched {
  --sched-row: 5px;
  --sched-hour: calc(var(--sched-row) * 12);
  --sched-practice: var(--course-accent, #0b7285);
  --sched-lecture: #e8590c;
  --sched-line: color-mix(in srgb, currentColor 13%, transparent);
  --sched-surface: color-mix(in srgb, currentColor 5%, transparent);
  --sched-bg: var(--bs-body-bg, #fff);
}

.quarto-dark .sched {
  --sched-practice: #3bc9db;
  --sched-lecture: #ffa94d;
}

/* ---------- Controls ---------- */

.sched-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 0.6rem;
  margin: 1rem 0 1.75rem;
}

.sched-controls__label {
  font-size: 0.85rem;
  opacity: 0.65;
  margin-right: 0.15rem;
}

.sched-chip,
.sched-dropdown > summary,
.sched-reset {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.38rem 0.9rem;
  border-radius: 999px;
  border: 1px solid var(--sched-line);
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: 0.92rem;
  line-height: 1.2;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.15s, border-color 0.15s, box-shadow 0.15s, opacity 0.15s;
}

.sched-chip:hover,
.sched-dropdown > summary:hover,
.sched-reset:hover {
  background: var(--sched-surface);
}

.sched-chip:focus-visible,
.sched-dropdown > summary:focus-visible,
.sched-reset:focus-visible {
  outline: 2px solid var(--course-accent, #0b7285);
  outline-offset: 2px;
}

.sched-chip--practice { --chip-color: var(--sched-practice); }
.sched-chip--lecture { --chip-color: var(--sched-lecture); }

.sched-chip[aria-pressed="true"] {
  background: color-mix(in srgb, var(--chip-color) 14%, transparent);
  border-color: var(--chip-color);
  box-shadow: inset 0 0 0 1px var(--chip-color);
  font-weight: 600;
}

.sched-dot {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  background: var(--chip-color);
  flex: none;
}

.sched-dropdown {
  position: relative;
  margin: 0;
}

.sched-dropdown > summary {
  list-style: none;
}

.sched-dropdown > summary::-webkit-details-marker {
  display: none;
}

.sched-dropdown > summary::after {
  content: "";
  width: 0.42rem;
  height: 0.42rem;
  margin-left: 0.1rem;
  border-right: 1.5px solid currentColor;
  border-bottom: 1.5px solid currentColor;
  transform: translateY(-2px) rotate(45deg);
  transition: transform 0.15s;
}

.sched-dropdown[open] > summary::after {
  transform: translateY(1px) rotate(225deg);
}

.sched-dropdown[open] > summary,
.sched-dropdown.is-active > summary {
  border-color: var(--course-accent, #0b7285);
  box-shadow: inset 0 0 0 1px var(--course-accent, #0b7285);
}

.sched-dropdown.is-active > summary {
  background: color-mix(in srgb, var(--course-accent, #0b7285) 12%, transparent);
  font-weight: 600;
}

.sched-dropdown__menu {
  position: absolute;
  z-index: 30;
  top: calc(100% + 0.4rem);
  left: 0;
  min-width: 17rem;
  max-height: 22rem;
  overflow-y: auto;
  padding: 0.35rem;
  border-radius: 0.8rem;
  border: 1px solid var(--sched-line);
  background: var(--sched-bg);
  box-shadow: 0 14px 36px -12px rgba(0, 0, 0, 0.35);
}

.sched-dropdown__item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.42rem 0.65rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.92rem;
  margin: 0;
}

.sched-dropdown__item:hover {
  background: var(--sched-surface);
}

.sched-dropdown__item input {
  margin: 0;
  accent-color: var(--course-accent, #0b7285);
}

.sched-dropdown__meta {
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.75rem;
  opacity: 0.65;
  font-variant-numeric: tabular-nums;
}

.sched-dropdown__meta .sched-dot {
  width: 0.45rem;
  height: 0.45rem;
}

.sched-reset {
  border-style: dashed;
  opacity: 0.85;
}

.sched-reset[hidden] {
  display: none;
}

.sched-status {
  flex-basis: 100%;
  margin: 0;
  font-size: 0.85rem;
  opacity: 0.7;
}

.sched-status:empty {
  display: none;
}

/* ---------- Calendar ---------- */

.sched-week {
  margin-top: 2.25rem;
}

.sched-week__title {
  font-size: 1.3rem;
  margin: 0 0 0.75rem;
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
}

.sched-week__title small {
  font-size: 0.85rem;
  font-weight: 400;
  opacity: 0.6;
}

.sched-scroll {
  overflow-x: auto;
  padding-bottom: 0.25rem;
}

.sched-grid {
  display: grid;
  grid-template-columns: 3.1rem repeat(4, minmax(150px, 1fr));
  min-width: 680px;
}

.sched-head {
  padding: 0.35rem 0 0.55rem;
  text-align: center;
  font-weight: 650;
  font-size: 0.95rem;
  border-bottom: 1px solid var(--sched-line);
}

.sched-head small {
  display: block;
  font-size: 0.72rem;
  font-weight: 400;
  opacity: 0.6;
}

.sched-gutter {
  position: relative;
}

.sched-hour {
  position: absolute;
  right: 0.55rem;
  transform: translateY(-50%);
  font-size: 0.72rem;
  opacity: 0.6;
  font-variant-numeric: tabular-nums;
}

.sched-day {
  position: relative;
  display: grid;
  grid-template-rows: repeat(168, var(--sched-row));
  grid-template-columns: repeat(12, minmax(0, 1fr));
  column-gap: 2px;
  border-left: 1px solid var(--sched-line);
  background-image: repeating-linear-gradient(
    to bottom,
    var(--sched-line) 0 1px,
    transparent 1px var(--sched-hour)
  );
}

.sched-day:last-child {
  border-right: 1px solid var(--sched-line);
}

.sched-slot {
  grid-row: var(--r1) / var(--r2);
  grid-column: var(--c1) / span var(--cs);
  min-width: 0;
  margin: 2px 2px;
  padding: 0.3rem 0.45rem 0.35rem 0.5rem;
  border-radius: 0.55rem;
  border-left: 3px solid var(--slot-color);
  background: color-mix(in srgb, var(--slot-color) 11%, var(--sched-bg));
  font-size: 0.76rem;
  line-height: 1.3;
  overflow: hidden;
  transition: opacity 0.25s, filter 0.25s, box-shadow 0.25s, background-color 0.25s;
}

.sched-slot--practice { --slot-color: var(--sched-practice); }
.sched-slot--lecture { --slot-color: var(--sched-lecture); }

.sched-slot__top {
  display: flex;
  justify-content: space-between;
  gap: 0.3rem;
  font-size: 0.66rem;
  white-space: nowrap;
}

.sched-slot__kind {
  color: var(--slot-color);
  font-weight: 750;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.sched-slot__time {
  opacity: 0.6;
  font-variant-numeric: tabular-nums;
}

.sched-slot__teacher {
  margin-top: 0.15rem;
  font-weight: 650;
  overflow-wrap: anywhere;
}

.sched-slot__group {
  opacity: 0.85;
  overflow-wrap: anywhere;
}

.sched.is-filtering .sched-slot.is-dim {
  opacity: 0.22;
  filter: saturate(0.15);
}

.sched.is-filtering .sched-slot.is-hit {
  background: color-mix(in srgb, var(--slot-color) 22%, var(--sched-bg));
  box-shadow: 0 0 0 2px var(--slot-color), 0 8px 20px -10px var(--slot-color);
}

/* Cards that share a day column with others get a smaller top line;
   with three or more side by side they also shrink and drop the time,
   which stays readable from the hour gutter. */
.sched-slot--narrow {
  margin-inline: 1px;
  padding-inline: 0.3rem 0.25rem;
  font-size: 0.68rem;
}

.sched-slot--tight .sched-slot__top {
  font-size: 0.6rem;
}

.sched-slot--narrow .sched-slot__teacher {
  letter-spacing: -0.01em;
}

.sched-slot--narrow .sched-slot__time {
  display: none;
}

.sched-empty {
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  align-self: center;
  text-align: center;
  font-size: 0.8rem;
  opacity: 0.45;
}

@media (prefers-reduced-motion: reduce) {
  .sched *,
  .sched *::after {
    transition: none !important;
  }
}
</style>

<div class="sched" id="schedule">
  <div class="sched-controls">
    <span class="sched-controls__label">Показать:</span>
    <div class="sched-toggle-group" role="group" aria-label="Тип занятия" style="display:contents">
      <button type="button" class="sched-chip sched-chip--practice" data-type="practice" aria-pressed="false">
        <span class="sched-dot" aria-hidden="true"></span>Практики
      </button>
      <button type="button" class="sched-chip sched-chip--lecture" data-type="lecture" aria-pressed="false">
        <span class="sched-dot" aria-hidden="true"></span>Лекции
      </button>
    </div>
    <details class="sched-dropdown" id="sched-teachers">
      <summary aria-label="Выбрать преподавателя"><span class="sched-dropdown__title">Преподаватель</span></summary>
      <div class="sched-dropdown__menu" role="group" aria-label="Преподаватели"></div>
    </details>
    <button type="button" class="sched-reset" id="sched-reset" hidden>Сбросить</button>
    <p class="sched-status" id="sched-status" aria-live="polite"></p>
  </div>
  <noscript><p>Для отображения календаря включите JavaScript.</p></noscript>
  <div id="sched-weeks"></div>
</div>

<script>
(function () {
  "use strict";

  // week: odd | even; day: Ср | Чт | Пт | Сб; type: practice | lecture.
  var SLOTS = [
    // Нечётная неделя
    ["odd", "Ср", "13:30", "15:00", "practice", "Курилов", "М3112"],
    ["odd", "Ср", "15:30", "17:00", "practice", "Курилов", "М3112"],
    ["odd", "Ср", "18:50", "20:20", "practice", "Влад", "М3103"],

    ["odd", "Чт", "8:10", "9:40", "practice", "Лакеев", "М3120"],
    ["odd", "Чт", "13:30", "15:00", "practice", "Курилов", "М3111"],
    ["odd", "Чт", "15:30", "17:00", "practice", "Курилов", "М3111"],
    ["odd", "Чт", "18:50", "20:20", "practice", "Моисеенко", "М3104"],
    ["odd", "Чт", "20:30", "22:00", "practice", "Моисеенко", "М3105"],

    ["odd", "Пт", "8:10", "9:40", "practice", "Окорочкова", "М3109"],
    ["odd", "Пт", "9:50", "11:20", "practice", "Иофинов", "М3107"],
    ["odd", "Пт", "9:50", "11:20", "practice", "Окорочкова", "М3109"],
    ["odd", "Пт", "11:30", "13:00", "practice", "Иофинов", "М3108"],
    ["odd", "Пт", "13:30", "15:00", "practice", "Курилов", "М3114"],
    ["odd", "Пт", "15:30", "17:00", "practice", "Иофинов", "М3106"],
    ["odd", "Пт", "15:30", "17:00", "practice", "Курилов", "М3114"],
    ["odd", "Пт", "17:10", "18:40", "lecture", "Фадеев", "М3111 – М3115"],
    ["odd", "Пт", "18:50", "20:20", "lecture", "Фадеев", "М3116 – М3120"],

    ["odd", "Сб", "9:50", "11:20", "lecture", "Хвастунов", "М3101 – М3105"],
    ["odd", "Сб", "9:50", "11:20", "practice", "Чагин", "М3117"],
    ["odd", "Сб", "9:50", "11:20", "practice", "Зырянова", "М3119"],
    ["odd", "Сб", "11:30", "13:00", "lecture", "Хвастунов", "М3106 – М3110"],
    ["odd", "Сб", "11:30", "13:00", "practice", "Зырянова", "М3118"],
    ["odd", "Сб", "13:30", "15:00", "practice", "Влад", "М3101"],
    ["odd", "Сб", "15:30", "17:00", "practice", "Влад", "М3102"],

    // Чётная неделя
    ["even", "Ср", "18:50", "20:20", "practice", "Влад", "М3103"],

    ["even", "Чт", "8:10", "9:40", "practice", "Лакеев", "М3120"],
    ["even", "Чт", "13:30", "15:00", "practice", "Курилов", "М3113"],
    ["even", "Чт", "15:30", "17:00", "practice", "Курилов", "М3113"],
    ["even", "Чт", "18:50", "20:20", "practice", "Моисеенко", "М3104"],
    ["even", "Чт", "20:30", "22:00", "practice", "Моисеенко", "М3105"],

    ["even", "Пт", "9:50", "11:20", "practice", "Иофинов", "М3107"],
    ["even", "Пт", "11:30", "13:00", "practice", "Иофинов", "М3108"],
    ["even", "Пт", "13:30", "15:00", "practice", "Иофинов", "М3106"],
    ["even", "Пт", "13:30", "15:00", "practice", "Курилов", "М3115"],
    ["even", "Пт", "15:30", "17:00", "practice", "Курилов", "М3115"],
    ["even", "Пт", "17:10", "18:40", "lecture", "Фадеев", "М3111 – М3115"],
    ["even", "Пт", "17:10", "18:40", "practice", "Окорочкова", "М3110"],
    ["even", "Пт", "17:10", "18:40", "practice", "Чагин", "М3117"],
    ["even", "Пт", "18:50", "20:20", "lecture", "Фадеев", "М3116 – М3120"],
    ["even", "Пт", "18:50", "20:20", "practice", "Окорочкова", "М3110"],

    ["even", "Сб", "9:50", "11:20", "lecture", "Хвастунов", "М3101 – М3105"],
    ["even", "Сб", "9:50", "11:20", "practice", "Чагин", "М3116"],
    ["even", "Сб", "9:50", "11:20", "practice", "Зырянова", "М3119"],
    ["even", "Сб", "11:30", "13:00", "lecture", "Хвастунов", "М3106 – М3110"],
    ["even", "Сб", "11:30", "13:00", "practice", "Чагин", "М3116"],
    ["even", "Сб", "11:30", "13:00", "practice", "Зырянова", "М3118"],
    ["even", "Сб", "13:30", "15:00", "practice", "Влад", "М3101"],
    ["even", "Сб", "15:30", "17:00", "practice", "Влад", "М3102"]
  ];

  var WEEKS = [
    { id: "odd", title: "Нечётная неделя" },
    { id: "even", title: "Чётная неделя" }
  ];
  var DAYS = [
    { id: "Ср", title: "Среда" },
    { id: "Чт", title: "Четверг" },
    { id: "Пт", title: "Пятница" },
    { id: "Сб", title: "Суббота" }
  ];
  var KIND = { practice: "Практика", lecture: "Лекция" };
  var KIND_PLURAL = { practice: "практики", lecture: "лекции" };
  var DAY_START = 8 * 60;
  var DAY_END = 22 * 60;
  var STEP = 5; // minutes per grid row
  var LANES = 12; // grid columns inside a day

  function minutes(hhmm) {
    var p = hhmm.split(":");
    return Number(p[0]) * 60 + Number(p[1]);
  }

  function pad(t) {
    return t.length === 4 ? "0" + t : t;
  }

  function plural(n, one, few, many) {
    var m10 = n % 10;
    var m100 = n % 100;
    if (m10 === 1 && m100 !== 11) return one;
    if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few;
    return many;
  }

  var slots = SLOTS.map(function (row, i) {
    return {
      id: i,
      week: row[0],
      day: row[1],
      start: row[2],
      end: row[3],
      startMin: minutes(row[2]),
      endMin: minutes(row[3]),
      type: row[4],
      teacher: row[5],
      group: row[6]
    };
  });

  // Assign every slot a lane and a width so that parallel classes share a
  // day column evenly: overlapping slots form a group, the group gets as many
  // lanes as its widest moment, and each slot takes LANES / lanes columns.
  function layoutDay(daySlots) {
    daySlots.sort(function (a, b) {
      return a.startMin - b.startMin || a.endMin - b.endMin || a.type.localeCompare(b.type);
    });
    var groups = [];
    var current = null;
    var currentEnd = -1;
    daySlots.forEach(function (s) {
      if (!current || s.startMin >= currentEnd) {
        current = [];
        groups.push(current);
        currentEnd = s.endMin;
      }
      current.push(s);
      currentEnd = Math.max(currentEnd, s.endMin);
    });
    groups.forEach(function (group) {
      var laneEnds = [];
      group.forEach(function (s) {
        var lane = laneEnds.findIndex(function (end) { return end <= s.startMin; });
        if (lane === -1) {
          lane = laneEnds.length;
          laneEnds.push(0);
        }
        laneEnds[lane] = s.endMin;
        s.lane = lane;
      });
      var width = Math.max(1, Math.floor(LANES / laneEnds.length));
      group.forEach(function (s) {
        s.col = s.lane * width + 1;
        s.span = width;
        s.tight = laneEnds.length >= 2;
        s.narrow = laneEnds.length >= 3;
      });
    });
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function renderSlot(s) {
    var node = el("div", "sched-slot sched-slot--" + s.type +
      (s.tight ? " sched-slot--tight" : "") + (s.narrow ? " sched-slot--narrow" : ""));
    node.style.setProperty("--r1", (s.startMin - DAY_START) / STEP + 1);
    node.style.setProperty("--r2", (s.endMin - DAY_START) / STEP + 1);
    node.style.setProperty("--c1", s.col);
    node.style.setProperty("--cs", s.span);
    node.dataset.type = s.type;
    node.dataset.teacher = s.teacher;
    node.title = KIND[s.type] + " · " + s.teacher + " · " + s.group + " · " + pad(s.start) + "–" + s.end;

    var top = el("div", "sched-slot__top");
    top.appendChild(el("span", "sched-slot__kind", KIND[s.type]));
    top.appendChild(el("span", "sched-slot__time", pad(s.start) + "–" + s.end));
    node.appendChild(top);
    node.appendChild(el("div", "sched-slot__teacher", s.teacher));
    node.appendChild(el("div", "sched-slot__group", s.group));
    return node;
  }

  function renderWeek(week) {
    var section = el("section", "sched-week");
    section.dataset.week = week.id;
    var weekSlots = slots.filter(function (s) { return s.week === week.id; });

    var title = el("h2", "sched-week__title", week.title);
    title.appendChild(el("small", null, weekSlots.length + " " + plural(weekSlots.length, "занятие", "занятия", "занятий")));
    section.appendChild(title);

    var scroll = el("div", "sched-scroll");
    var grid = el("div", "sched-grid");
    scroll.appendChild(grid);
    section.appendChild(scroll);

    grid.appendChild(el("div", "sched-head sched-head--gutter"));
    DAYS.forEach(function (day) {
      var count = weekSlots.filter(function (s) { return s.day === day.id; }).length;
      var head = el("div", "sched-head", day.title);
      head.appendChild(el("small", null, count ? count + " " + plural(count, "пара", "пары", "пар") : "нет занятий"));
      grid.appendChild(head);
    });

    var gutter = el("div", "sched-gutter");
    for (var h = DAY_START / 60; h <= DAY_END / 60; h++) {
      var label = el("span", "sched-hour", (h < 10 ? "0" + h : h) + ":00");
      label.style.top = "calc(var(--sched-hour) * " + (h - DAY_START / 60) + ")";
      gutter.appendChild(label);
    }
    grid.appendChild(gutter);

    DAYS.forEach(function (day) {
      var column = el("div", "sched-day");
      column.dataset.day = day.id;
      var daySlots = weekSlots.filter(function (s) { return s.day === day.id; });
      layoutDay(daySlots);
      if (!daySlots.length) {
        column.appendChild(el("div", "sched-empty", "—"));
      }
      daySlots.forEach(function (s) { column.appendChild(renderSlot(s)); });
      grid.appendChild(column);
    });

    return section;
  }

  var root = document.getElementById("schedule");
  var weeksRoot = document.getElementById("sched-weeks");
  WEEKS.forEach(function (week) { weeksRoot.appendChild(renderWeek(week)); });

  // ---------- Filters ----------

  var typeButtons = Array.prototype.slice.call(root.querySelectorAll(".sched-chip[data-type]"));
  var dropdown = document.getElementById("sched-teachers");
  var menu = dropdown.querySelector(".sched-dropdown__menu");
  var summaryTitle = dropdown.querySelector(".sched-dropdown__title");
  var resetButton = document.getElementById("sched-reset");
  var status = document.getElementById("sched-status");
  var slotNodes = Array.prototype.slice.call(root.querySelectorAll(".sched-slot"));

  var teachers = {};
  slots.forEach(function (s) {
    var t = teachers[s.teacher] || (teachers[s.teacher] = { name: s.teacher, count: 0, types: {} });
    t.count++;
    t.types[s.type] = true;
  });
  var teacherList = Object.keys(teachers).sort(function (a, b) { return a.localeCompare(b, "ru"); });

  teacherList.forEach(function (name) {
    var t = teachers[name];
    var item = el("label", "sched-dropdown__item");
    var input = document.createElement("input");
    input.type = "checkbox";
    input.value = name;
    item.appendChild(input);
    item.appendChild(el("span", null, name));
    var meta = el("span", "sched-dropdown__meta");
    Object.keys(t.types).forEach(function (type) {
      var dot = el("span", "sched-dot sched-chip--" + type);
      dot.setAttribute("aria-hidden", "true");
      meta.appendChild(dot);
      meta.appendChild(el("span", null, KIND_PLURAL[type]));
    });
    meta.appendChild(el("span", null, "· " + t.count));
    item.appendChild(meta);
    menu.appendChild(item);
  });
  var teacherInputs = Array.prototype.slice.call(menu.querySelectorAll("input"));

  function applyFilters() {
    var types = typeButtons
      .filter(function (b) { return b.getAttribute("aria-pressed") === "true"; })
      .map(function (b) { return b.dataset.type; });
    var picked = teacherInputs
      .filter(function (i) { return i.checked; })
      .map(function (i) { return i.value; });
    var filtering = types.length > 0 || picked.length > 0;

    root.classList.toggle("is-filtering", filtering);
    dropdown.classList.toggle("is-active", picked.length > 0);
    resetButton.hidden = !filtering;

    var hits = 0;
    slotNodes.forEach(function (node) {
      var ok = (!types.length || types.indexOf(node.dataset.type) !== -1) &&
               (!picked.length || picked.indexOf(node.dataset.teacher) !== -1);
      node.classList.toggle("is-hit", filtering && ok);
      node.classList.toggle("is-dim", filtering && !ok);
      if (ok) hits++;
    });

    summaryTitle.textContent = picked.length === 0 ? "Преподаватель"
      : picked.length === 1 ? picked[0]
      : picked.length === 2 ? picked.join(", ")
      : "Преподаватели: " + picked.length;

    status.textContent = filtering
      ? "Подсвечено " + hits + " " + plural(hits, "занятие", "занятия", "занятий") + " из " + slotNodes.length
      : "";
  }

  typeButtons.forEach(function (b) {
    b.addEventListener("click", function () {
      b.setAttribute("aria-pressed", b.getAttribute("aria-pressed") === "true" ? "false" : "true");
      applyFilters();
    });
  });
  teacherInputs.forEach(function (i) { i.addEventListener("change", applyFilters); });
  resetButton.addEventListener("click", function () {
    typeButtons.forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
    teacherInputs.forEach(function (i) { i.checked = false; });
    applyFilters();
  });

  // Close the teacher dropdown on outside click or Escape.
  document.addEventListener("click", function (e) {
    if (dropdown.open && !dropdown.contains(e.target)) dropdown.open = false;
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && dropdown.open) {
      dropdown.open = false;
      dropdown.querySelector("summary").focus();
    }
  });

  applyFilters();
})();
</script>
```

:::
