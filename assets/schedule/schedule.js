// Календарь расписания.
//
// Источник данных — markdown-таблицы страницы schedule.md: заголовок `##`
// задаёт неделю, `###` — день, а строки таблицы — пары в формате
// «Время | Тип. Преподаватель. Группа». Скрипт читает их из DOM, рисует
// календарь с фильтрами и прячет таблицы; без JavaScript остаются таблицы.

(function () {
  "use strict";

  var KIND = { practice: "Практика", lecture: "Лекция" };
  var KIND_PLURAL = { practice: "практики", lecture: "лекции" };
  var STEP = 5; // минут в строке сетки
  var LANES = 12; // колонок сетки внутри дня

  var main = document.getElementById("quarto-document-content");
  if (!main) return;
  var weekSections = Array.prototype.slice.call(main.querySelectorAll(":scope > section.level2"));
  if (!weekSections.length) return;

  // ---------- Разбор таблиц ----------

  function minutes(hhmm) {
    var p = hhmm.trim().split(":");
    return Number(p[0]) * 60 + Number(p[1]);
  }

  function format(min) {
    var h = Math.floor(min / 60);
    var m = min % 60;
    return (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m);
  }

  function plural(n, one, few, many) {
    var m10 = n % 10;
    var m100 = n % 100;
    if (m10 === 1 && m100 !== 11) return one;
    if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few;
    return many;
  }

  function parseType(text) {
    var t = text.toLowerCase();
    if (t.indexOf("лекц") === 0) return "lecture";
    if (t.indexOf("практ") === 0) return "practice";
    return null;
  }

  var weeks = [];
  var slots = [];

  weekSections.forEach(function (section, weekIndex) {
    var week = {
      id: "w" + weekIndex,
      title: section.querySelector("h2").textContent.trim(),
      days: [],
      section: section
    };
    section.querySelectorAll("section.level3").forEach(function (daySection, dayIndex) {
      var day = { id: "d" + dayIndex, title: daySection.querySelector("h3").textContent.trim() };
      week.days.push(day);
      daySection.querySelectorAll("tbody tr").forEach(function (row) {
        var cells = row.querySelectorAll("td");
        if (cells.length < 2) return;
        var time = cells[0].textContent.split(/[-–—]/);
        var parts = cells[1].textContent.split(".").map(function (s) { return s.trim(); }).filter(Boolean);
        var type = parts.length ? parseType(parts[0]) : null;
        if (time.length < 2 || !type) {
          console.warn("Расписание: строка не разобрана:", row.textContent.trim());
          return;
        }
        slots.push({
          week: week.id,
          day: day.id,
          startMin: minutes(time[0]),
          endMin: minutes(time[1]),
          type: type,
          teacher: parts[1] || "",
          group: parts.slice(2).join(". ").replace(/\s*-\s*/g, " – ")
        });
      });
    });
    weeks.push(week);
  });

  if (!slots.length) return;

  var dayStart = Math.floor(Math.min.apply(null, slots.map(function (s) { return s.startMin; })) / 60) * 60;
  var dayEnd = Math.ceil(Math.max.apply(null, slots.map(function (s) { return s.endMin; })) / 60) * 60;
  var rows = (dayEnd - dayStart) / STEP;

  // ---------- Раскладка ----------

  // Пересекающиеся пары образуют группу; группа получает столько дорожек,
  // сколько пар идёт одновременно, и каждая пара занимает LANES / дорожки колонок.
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

  // ---------- Отрисовка ----------

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function renderSlot(s) {
    var node = el("div", "sched-slot sched-slot--" + s.type +
      (s.tight ? " sched-slot--tight" : "") + (s.narrow ? " sched-slot--narrow" : ""));
    node.style.setProperty("--r1", (s.startMin - dayStart) / STEP + 1);
    node.style.setProperty("--r2", (s.endMin - dayStart) / STEP + 1);
    node.style.setProperty("--c1", s.col);
    node.style.setProperty("--cs", s.span);
    node.dataset.type = s.type;
    node.dataset.teacher = s.teacher;
    var time = format(s.startMin) + "–" + format(s.endMin);
    node.title = KIND[s.type] + " · " + s.teacher + " · " + s.group + " · " + time;

    var top = el("div", "sched-slot__top");
    top.appendChild(el("span", "sched-slot__kind", KIND[s.type]));
    top.appendChild(el("span", "sched-slot__time", time));
    node.appendChild(top);
    node.appendChild(el("div", "sched-slot__teacher", s.teacher));
    node.appendChild(el("div", "sched-slot__group", s.group));
    return node;
  }

  function renderWeek(week) {
    var section = el("section", "sched-week");
    var weekSlots = slots.filter(function (s) { return s.week === week.id; });

    var title = el("h2", "sched-week__title", week.title);
    title.appendChild(el("small", null, weekSlots.length + " " + plural(weekSlots.length, "занятие", "занятия", "занятий")));
    section.appendChild(title);

    var scroll = el("div", "sched-scroll");
    var grid = el("div", "sched-grid");
    grid.style.setProperty("--sched-days", week.days.length);
    scroll.appendChild(grid);
    section.appendChild(scroll);

    grid.appendChild(el("div", "sched-head"));
    week.days.forEach(function (day) {
      var count = weekSlots.filter(function (s) { return s.day === day.id; }).length;
      var head = el("div", "sched-head", day.title);
      head.appendChild(el("small", null, count ? count + " " + plural(count, "пара", "пары", "пар") : "нет занятий"));
      grid.appendChild(head);
    });

    var gutter = el("div", "sched-gutter");
    for (var h = dayStart / 60; h <= dayEnd / 60; h++) {
      var label = el("span", "sched-hour", format(h * 60));
      label.style.top = "calc(var(--sched-hour) * " + (h - dayStart / 60) + ")";
      gutter.appendChild(label);
    }
    grid.appendChild(gutter);

    week.days.forEach(function (day) {
      var column = el("div", "sched-day");
      column.style.setProperty("--sched-rows", rows);
      var daySlots = weekSlots.filter(function (s) { return s.day === day.id; });
      layoutDay(daySlots);
      if (!daySlots.length) column.appendChild(el("div", "sched-empty", "—"));
      daySlots.forEach(function (s) { column.appendChild(renderSlot(s)); });
      grid.appendChild(column);
    });

    return section;
  }

  function renderControls() {
    var controls = el("div", "sched-controls");
    controls.appendChild(el("span", "sched-controls__label", "Показать:"));

    var group = el("div", null);
    group.style.display = "contents";
    group.setAttribute("role", "group");
    group.setAttribute("aria-label", "Тип занятия");
    [["practice", "Практики"], ["lecture", "Лекции"]].forEach(function (pair) {
      var button = el("button", "sched-chip sched-chip--" + pair[0]);
      button.type = "button";
      button.dataset.type = pair[0];
      button.setAttribute("aria-pressed", "false");
      var dot = el("span", "sched-dot");
      dot.setAttribute("aria-hidden", "true");
      button.appendChild(dot);
      button.appendChild(document.createTextNode(pair[1]));
      group.appendChild(button);
    });
    controls.appendChild(group);

    var dropdown = el("details", "sched-dropdown");
    var summary = el("summary");
    summary.setAttribute("aria-label", "Выбрать преподавателя");
    summary.appendChild(el("span", "sched-dropdown__title", "Преподаватель"));
    dropdown.appendChild(summary);
    var menu = el("div", "sched-dropdown__menu");
    menu.setAttribute("role", "group");
    menu.setAttribute("aria-label", "Преподаватели");
    dropdown.appendChild(menu);
    controls.appendChild(dropdown);

    var reset = el("button", "sched-reset", "Сбросить");
    reset.type = "button";
    reset.hidden = true;
    controls.appendChild(reset);

    var status = el("p", "sched-status");
    status.setAttribute("aria-live", "polite");
    controls.appendChild(status);

    return controls;
  }

  // Точка монтирования — пустой div `::: {#schedule .column-page}` в markdown:
  // класс column-page должен быть виден Quarto при рендере, чтобы страница
  // получила широкую сетку. Без него календарь встаёт перед первой неделей.
  var root = document.getElementById("schedule");
  if (!root) {
    root = el("div", null);
    root.id = "schedule";
    weekSections[0].parentNode.insertBefore(root, weekSections[0]);
  }
  root.classList.add("sched");
  var controls = renderControls();
  root.appendChild(controls);
  weeks.forEach(function (week) { root.appendChild(renderWeek(week)); });

  weekSections.forEach(function (section) { section.classList.add("sched-source"); });
  main.classList.add("sched-has-calendar");

  // ---------- Фильтры ----------

  var typeButtons = Array.prototype.slice.call(controls.querySelectorAll(".sched-chip[data-type]"));
  var dropdown = controls.querySelector(".sched-dropdown");
  var menu = dropdown.querySelector(".sched-dropdown__menu");
  var summaryTitle = dropdown.querySelector(".sched-dropdown__title");
  var resetButton = controls.querySelector(".sched-reset");
  var status = controls.querySelector(".sched-status");
  var slotNodes = Array.prototype.slice.call(root.querySelectorAll(".sched-slot"));

  var teachers = {};
  slots.forEach(function (s) {
    var t = teachers[s.teacher] || (teachers[s.teacher] = { count: 0, types: {} });
    t.count++;
    t.types[s.type] = true;
  });
  Object.keys(teachers).sort(function (a, b) { return a.localeCompare(b, "ru"); }).forEach(function (name) {
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
      : picked.length <= 2 ? picked.join(", ")
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

  // Закрывать список преподавателей по клику снаружи и по Escape.
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
