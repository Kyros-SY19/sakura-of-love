// ========================================
// CONFIGURACIÓN Y VARIABLES GLOBALES
// ========================================

let animationData = {
  para: "",
  de: "",
  fecha: null,
};

let counterInterval = null;

const romanticMessages = [
  (name) =>
    `Si pudiera elegir un lugar seguro, sería a tu lado, ${name}. Cuanto más tiempo estoy contigo, más te amo.`,
  (name) =>
    `${name}, no prometo un amor perfecto, prometo un amor real, de esos que se quedan incluso en los días difíciles.`,
  (name) =>
    `Amarte no fue una decisión, ${name}, fue algo que simplemente pasó… y no pienso detenerlo nunca.`,
  (name) =>
    `Tu sonrisa, ${name}, tiene la costumbre de arreglar mis días, incluso cuando todo parece complicado.`,
  (name) =>
    `No sé qué hice para merecerte, ${name}, pero prometo cuidarte como si fueras mi mayor tesoro.`,
  (name) =>
    `Contigo, ${name}, entendí que el amor no es buscar a alguien perfecto, sino amar a alguien imperfecto perfectamente.`,
  (name) =>
    `${name}, eres mi casualidad favorita, mi lugar seguro y mi persona en este mundo.`,
  (name) =>
    `A tu lado, ${name}, aprendí que el amor no hace ruido, pero lo cambia todo.`,
  (name) =>
    `No necesito promesas eternas, ${name}, me basta con que sigas eligiéndome cada día.`,
  (name) =>
    `Si algún día me pierdo, ${name}, recuérdame que mi hogar siempre ha sido tu abrazo.`,
];

// ========================================
// INICIALIZACIÓN
// ========================================

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const hasParams =
    urlParams.has("para") && urlParams.has("de") && urlParams.has("fecha");

  if (hasParams) {
    animationData.para = urlParams.get("para");
    animationData.de = urlParams.get("de");
    animationData.fecha = new Date(urlParams.get("fecha").replace("T", " "));

    document.getElementById("form-container").classList.add("hidden");
    document.getElementById("animation-container").classList.remove("hidden");

    setTimeout(startAnimation, 500);
  } else {
    setupForm();
  }
});

// ========================================
// FORMULARIO
// ========================================

function setupForm() {
  const form = document.getElementById("love-form");
  const copyBtn = document.getElementById("copy-btn");
  const viewBtn = document.getElementById("view-btn");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const para = document.getElementById("para").value;
    const de = document.getElementById("de").value;
    const fecha = document.getElementById("fecha").value;

    const baseUrl = window.location.origin + window.location.pathname;
    const params = new URLSearchParams({ para, de, fecha });
    const generatedUrl = `${baseUrl}?${params.toString()}`;

    document.getElementById("generated-link").value = generatedUrl;
    document.getElementById("link-container").classList.remove("hidden");

    animationData.para = para;
    animationData.de = de;
    animationData.fecha = new Date(fecha.replace("T", " "));
  });

  copyBtn.addEventListener("click", () => {
    const linkInput = document.getElementById("generated-link");
    linkInput.select();
    document.execCommand("copy");

    copyBtn.textContent = "¡Copiado! ✓";
    setTimeout(() => (copyBtn.textContent = "Copiar"), 2000);
  });

  viewBtn.addEventListener("click", () => {
    document.getElementById("form-container").classList.add("hidden");
    document.getElementById("animation-container").classList.remove("hidden");
    setTimeout(startAnimation, 500);
  });
}

// ========================================
// SECUENCIA PRINCIPAL
// ========================================

function startAnimation() {
  const introHeart = document.getElementById("intro-heart");

  const handleStart = () => {
    beginSequence();
  };

  introHeart.addEventListener("click", handleStart, { once: true });
  introHeart.addEventListener("touchstart", handleStart, { once: true });
}

function beginSequence() {
  const introHeart = document.getElementById("intro-heart");
  const music = document.getElementById("bg-music");

  if (music) {
    music.volume = 0.6;
    music.play().catch(() => {
      console.log("Autoplay bloqueado hasta interacción válida.");
    });
  }

  introHeart.classList.add("contracting");

  setTimeout(() => {
    introHeart.classList.add("hidden");
    showFinal();
    startPetals();
    startSparkles();
  }, 2000);
}

// ========================================
// TEXTO FINAL Y CONTADOR
// ========================================

function showFinal() {
  const finalText = document.getElementById("final-text");
  setupFinalText();
  finalText.classList.remove("hidden");
  finalText.classList.add("showing");
  startCounter();
}

function setupFinalText() {
  const textPara = document.getElementById("text-para");
  const textMessage = document.getElementById("text-message");
  const textDe = document.getElementById("text-de");

  textPara.textContent = `Para el amor de mi vida 💖`;
  textDe.textContent = `Con amor, ${animationData.de}`;

  const randomIndex = Math.floor(Math.random() * romanticMessages.length);
  const message = romanticMessages[randomIndex](animationData.para);

  let i = 0;
  textMessage.textContent = "";

  const typingSpeed = window.innerWidth < 768 ? 65 : 40; // más lento en móvil

  const typing = setInterval(() => {
    if (i < message.length) {
      textMessage.textContent += message[i];
      i++;
    } else {
      clearInterval(typing);
    }
  }, typingSpeed);
}

function startCounter() {
  const counterDiv = document.getElementById("counter");

  function updateCounter() {
    const now = new Date();
    const diff = now - animationData.fecha;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    counterDiv.textContent = `Mi amor por ti comenzó hace: ${days} días, ${hours} horas, ${minutes} minutos, ${seconds} segundos`;
  }

  updateCounter();
  counterInterval = setInterval(updateCounter, 1000);
}

// ========================================
// EFECTOS
// ========================================

function startPetals() {
  const container = document.querySelector(".petals-container");

  setInterval(() => {
    const petal = document.createElement("div");
    petal.classList.add("petal");

    petal.style.left = Math.random() * 100 + "vw";
    petal.style.animationDuration = 6 + Math.random() * 5 + "s";
    petal.style.opacity = Math.random() * 0.5 + 0.4;

    container.appendChild(petal);
    setTimeout(() => petal.remove(), 12000);
  }, 350);
}

function startSparkles() {
  const container = document.querySelector(".sparkles-container");

  setInterval(() => {
    const sparkle = document.createElement("div");
    sparkle.classList.add("sparkle");

    sparkle.style.left = Math.random() * 100 + "vw";
    sparkle.style.animationDuration = 8 + Math.random() * 6 + "s";
    sparkle.style.opacity = Math.random() * 0.6 + 0.3;

    container.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 15000);
  }, 500);
}

// ========================================
// LIMPIEZA
// ========================================

window.addEventListener("beforeunload", () => {
  if (counterInterval) clearInterval(counterInterval);
});
