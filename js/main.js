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
  url.searchParams.set("to", encodeURIComponent(to));
  url.searchParams.set("from", encodeURIComponent(from));
  url.searchParams.set("since", encodeURIComponent(since));
  return url.toString();
}

function parseSince(raw) {
  if (!raw) return null;
  const safe = decodeURIComponent(raw).replace(" ", "T");
  const d = new Date(safe);
  if (isNaN(d.getTime())) return null;
  return d;
}

// =========================
// DOM (ids reales de tu HTML)
// =========================
const formContainer = qs("form");
const form = qs("love-form");
const scene = qs("content");

const toNameEl = qs("toName");
const fromNameEl = qs("fromName");
const counterEl = qs("counter");

const shareBox = qs("share-box");
const shareUrlInput = qs("share-url");
const copyBtn = qs("copy-url");

// =========================
// Init
// =========================
document.addEventListener("DOMContentLoaded", () => {
  try {
    const params = getParams();
    const sinceDate = parseSince(params.since);

    if (params.to && params.from && sinceDate) {
      startScene({ ...params, sinceDate });
    } else {
      formContainer.classList.remove("hidden");
    }
  } catch (e) {
    console.error("Error fatal:", e);
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

  shareUrlInput.value = shareUrl;
  shareBox.classList.remove("hidden");

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
function startScene({ to, from, sinceDate }) {
  formContainer.classList.add("hidden");

  toNameEl.textContent = to;
  fromNameEl.textContent = from;

  scene.classList.add("show");

  startCounter(sinceDate);
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

    counterEl.textContent = `Mi amor por ti comenzó hace… ${days} días ${hours} horas ${minutes} minutos ${seconds} segundos 💕`;
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

  document.body.appendChild(petal);

  setTimeout(() => petal.remove(), duration * 1000);
}

function startPetals() {
  setInterval(createPetal, 400);
}
