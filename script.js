
// SORTEO LAB 5.0
// Navegación entre las secciones del portal.

const pages = document.querySelectorAll(".page");
const navigationLinks = document.querySelectorAll(".nav-link");

const menuToggle = document.getElementById("menu-toggle");
const mainNav = document.getElementById("main-nav");

// Mostrar una sección y ocultar las demás.
function showPage(pageName) {
  const targetPage = document.getElementById(pageName);

  if (!targetPage || !targetPage.classList.contains("page")) {
    return;
  }

  pages.forEach((page) => {
    const isActive = page.id === pageName;

    page.hidden = !isActive;
    page.classList.toggle("active", isActive);
  });

  navigationLinks.forEach((link) => {
    const isActive = link.dataset.page === pageName;

    link.classList.toggle("active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// Conectar todos los botones de navegación.
document.querySelectorAll("[data-page]").forEach((element) => {
  element.addEventListener("click", (event) => {
    event.preventDefault();

    const pageName = element.dataset.page;

    if (window.location.hash === `#${pageName}`) {
      showPage(pageName);
    } else {
      window.location.hash = pageName;
    }
  });
});

// Menú para celulares.
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

// Mantener la sección correcta al usar Atrás o Adelante.
window.addEventListener("hashchange", () => {
  const pageName = window.location.hash.substring(1) || "inicio";
  showPage(pageName);
});

// Combinaciones fijas, ficticias e ilustrativas.
// No corresponden a sorteos reales.
const sampleResults = {
  baloto: {
    numbers: [8, 14, 23, 31, 42],
    bonus: 10
  },

  revancha: {
    numbers: [12, 15, 10, 20, 35],
    bonus: 03
  }
};

// Crear una balota visual.
function createNumberBall(number) {
  const ball = document.createElement("span");

  ball.className = "number-ball";
  ball.textContent = String(number).padStart(2, "0");

  return ball;
}

// Mostrar una combinación en la sección correspondiente.
function renderNumbers(containerId, numbers) {
  const container = document.getElementById(containerId);

  if (!container) return;

  container.replaceChildren();

  numbers.forEach((number) => {
    container.appendChild(createNumberBall(number));
  });
}

// Mostrar número adicional.
function renderBonus(elementId, number) {
  const element = document.getElementById(elementId);

  if (!element) return;

  element.textContent = String(number).padStart(2, "0");
}

// Mostrar los mismos datos en Resultados y en cada modalidad.
function renderAllResults() {
  renderNumbers(
    "baloto-numbers",
    sampleResults.baloto.numbers
  );

  renderBonus(
    "baloto-bonus",
    sampleResults.baloto.bonus
  );

  renderNumbers(
    "revancha-numbers",
    sampleResults.revancha.numbers
  );

  renderBonus(
    "revancha-bonus",
    sampleResults.revancha.bonus
  );

  renderNumbers(
    "baloto-detail-numbers",
    sampleResults.baloto.numbers
  );

  renderBonus(
    "baloto-detail-bonus",
    sampleResults.baloto.bonus
  );

  renderNumbers(
    "revancha-detail-numbers",
    sampleResults.revancha.numbers
  );

  renderBonus(
    "revancha-detail-bonus",
    sampleResults.revancha.bonus
  );
}

// Iniciar la página.
renderAllResults();

const initialPage =
  window.location.hash.substring(1) || "inicio";

showPage(initialPage);

// HISTORIAL ILUSTRATIVO

const historyRecords = document.getElementById("history-records");
const historyYear = document.getElementById("history-year");
const historyMonth = document.getElementById("history-month");
const historyMore = document.getElementById("history-more");

const historyStart = Date.UTC(2025, 0, 1);
const historyEnd = Date.UTC(2026, 10, 7);
const twoDays = 2 * 24 * 60 * 60 * 1000;

const fictionalHistory = [];
let visibleHistoryCount = 10;

// Generador determinista: una misma fecha siempre
// muestra la misma combinación ficticia.
function seededRandom(seed) {
  let state = seed >>> 0;

  return function () {
    state = (1664525 * state + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function makeFictionalCombination(seed) {
  const random = seededRandom(seed);
  const numbers = new Set();

  while (numbers.size < 5) {
    numbers.add(Math.floor(random() * 43) + 1);
  }

  return {
    numbers: [...numbers].sort((a, b) => a - b),
    bonus: Math.floor(random() * 16) + 1
  };
}

for (let date = historyStart; date <= historyEnd; date += twoDays) {
  const dayIndex = Math.floor(date / 86400000);

  fictionalHistory.push({
    date,
    baloto: makeFictionalCombination(dayIndex + 101),
    revancha: makeFictionalCombination(dayIndex + 909)
  });
}

fictionalHistory.reverse();

const fechaModificar = Date.UTC(2026, 11, 6);

const nuevosNumeros = {
  baloto: {
    numbers: [4, 12, 19, 28, 36],
    bonus: 9
  },
  revancha: {
    numbers: [10, 19, 21, 29, 39],
    bonus: 12
  }
};

// Buscar la fecha dentro del historial
const registro = fictionalHistory.find(
  item => item.date === fechaModificar
);

if (registro) {
  // Modificar el registro existente
  registro.baloto = nuevosNumeros.baloto;
  registro.revancha = nuevosNumeros.revancha;
} else {
  // Agregar la fecha si no existe
  fictionalHistory.push({
    date: fechaModificar,
    ...nuevosNumeros
  });
}

// Mantener el historial ordenado
fictionalHistory.sort((a, b) => b.date - a.date);


function createHistoryGame(title, combination) {
  const section = document.createElement("div");
  section.className = "history-game";

  const heading = document.createElement("h3");
  heading.textContent = title;

  const balls = document.createElement("div");
  balls.className = "ball-row";

  combination.numbers.forEach(number => {
    balls.appendChild(createNumberBall(number));
  });

  const extra = document.createElement("p");
  extra.className = "history-extra";
  extra.textContent =
    `Número adicional: ${String(combination.bonus).padStart(2, "0")}`;

  section.append(heading, balls, extra);
  return section;
}

function renderFictionalHistory() {
  const year = historyYear.value;
  const month = historyMonth.value;

  const filtered = fictionalHistory.filter(record => {
    const date = new Date(record.date);

    const matchesYear =
      year === "todos" ||
      date.getUTCFullYear() === Number(year);

    const matchesMonth =
      month === "todos" ||
      date.getUTCMonth() === Number(month);

    return matchesYear && matchesMonth;
  });

  historyRecords.replaceChildren();

  filtered.slice(0, visibleHistoryCount).forEach(record => {
    const card = document.createElement("article");
    card.className = "history-card";

    const dateLabel = document.createElement("div");
    dateLabel.className = "history-date";
    dateLabel.textContent = new Date(record.date)
      .toLocaleDateString("es-CO", {
        timeZone: "UTC",
        day: "numeric",
        month: "long",
        year: "numeric"
      });

    const combinations = document.createElement("div");
    combinations.className = "history-combinations";

    combinations.append(
      createHistoryGame("Baloto · muestra", record.baloto),
      createHistoryGame("Revancha · muestra", record.revancha)
    );

    card.append(dateLabel, combinations);
    historyRecords.appendChild(card);
  });

  historyMore.hidden = visibleHistoryCount >= filtered.length;
}

historyYear.addEventListener("change", () => {
  visibleHistoryCount = 10;
  renderFictionalHistory();
});

historyMonth.addEventListener("change", () => {
  visibleHistoryCount = 10;
  renderFictionalHistory();
});

historyMore.addEventListener("click", () => {
  visibleHistoryCount += 10;
  renderFictionalHistory();
});

renderFictionalHistory();

