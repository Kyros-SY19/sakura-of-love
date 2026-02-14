// =========================
// Utils
// =========================
const qs = (id) => document.getElementById(id);

function getParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    to: params.get("to"),
    from: params.get("from"),
    since: params.get("since"),
  };
}

function buildShareUrl({ to, from, since }) {
  const url = new URL(window.location.href);
  url.searchParams.set("to", to);
  url.searchParams.set("from", from);
  url.searchParams.set("since", since);
  return url.toString();
}

// =========================
// DOM
// =========================
const formContainer = qs("form-container");
const form = qs("love-form");
const scene = qs("scene");

const toNameEl = qs("toName");
const fromNameEl = qs("fromName");
const sinceTextEl = qs("sinceText");
const counterEl = qs("counter");
const petalsLayer = qs("petals-layer");

const shareBox = qs("share-box");
const shareUrlInput = qs("share-url");
const copyBtn = qs("copy-url");

// =========================
// Init
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const params = getParams();

  if (params.to && params.from && params.since) {
    startScene(params);
  } else {
    formContainer.classList.remove("hidden");
  }
});

// =========================
// Form submit
// =========================
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const to = qs("to").value.trim();
  const from = qs("from").value.trim();
  const since = qs("since").value;

  if (!to || !from || !since) return;

  const shareUrl = buildShareUrl({ to, from, since });

  // Mostrar link generado
  shareUrlInput.value = shareUrl;
  shareBox.classList.remove("hidden");

  // Guardar por comodidad
  localStorage.setItem("sakuraOfLove", JSON.stringify({ to, from, since }));
});

// =========================
// Copy link
// =========================
copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(shareUrlInput.value);
    copyBtn.textContent = "¡Copiado! 💖";
    setTimeout(() => (copyBtn.textContent = "Copiar link"), 2000);
  } catch {
    alert("No se pudo copiar el link, cópialo manualmente 😅");
  }
});

// =========================
// Scene
// =========================
function startScene({ to, from, since }) {
  formContainer.classList.add("hidden");

  toNameEl.textContent = to;
  fromNameEl.textContent = from;
  sinceTextEl.textContent = new Date(since).toLocaleString("es-ES", {
    dateStyle: "long",
    timeStyle: "short",
  });

  scene.classList.add("show");

  startCounter(new Date(since));
  startPetals();
}

// =========================
// Counter
// =========================
function startCounter(startDate) {
  function update() {
    const now = new Date();
    const diff = Math.max(0, now - startDate);

    const seconds = Math.floor(diff / 1000) % 60;
    const minutes = Math.floor(diff / (1000 * 60)) % 60;
    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    counterEl.textContent = `Mi amor por ti comenzó hace… ${days} días ${hours} horas ${minutes} minutos ${seconds} segundos`;
  }

  update();
  setInterval(update, 1000);
}

// =========================
// Petals
// =========================
function createPetal() {
  const petal = document.createElement("div");
  petal.className = "petal";

  const size = Math.random() * 6 + 6;
  const left = Math.random() * window.innerWidth;
  const duration = Math.random() * 6 + 6;
  const wind = (Math.random() - 0.5) * 200;

  petal.style.width = `${size}px`;
  petal.style.height = `${size}px`;
  petal.style.left = `${left}px`;
  petal.style.animationDuration = `${duration}s`;
  petal.style.setProperty("--x", `${wind}px`);

  petalsLayer.appendChild(petal);

  setTimeout(() => petal.remove(), duration * 1000);
}

function startPetals() {
  setInterval(createPetal, 400);
}
