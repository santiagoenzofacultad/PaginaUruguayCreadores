/* ==========================================================
   URUGUAY CREADORES · Maqueta de propuesta
   1) Cuenta regresiva hasta el debut (solo en la portada)
   2) Filtro "Mostrar solo a Uruguay" (solo en la página de partidos)
   Cada parte se activa únicamente si encuentra sus elementos en la página.
   ========================================================== */

// --- 1) Cuenta regresiva ---
// Debut: Argentina vs Uruguay, sábado 14 de noviembre de 2026, 11:00 (hora de Uruguay, UTC-3).
// Si el horario cambia, se cambia solo esta línea.
const DEBUT = new Date("2026-11-14T11:00:00-03:00");

const relojCaja = document.getElementById("reloj");

if (relojCaja) {
  const reloj = {
    dias: document.getElementById("reloj-dias"),
    horas: document.getElementById("reloj-horas"),
    minutos: document.getElementById("reloj-minutos"),
    segundos: document.getElementById("reloj-segundos")
  };

  const dosDigitos = function (numero) {
    return String(numero).padStart(2, "0");
  };

  const actualizarReloj = function () {
    const falta = DEBUT.getTime() - Date.now();

    if (falta <= 0) {
      // Ya empezó: mostramos un mensaje en lugar de los números
      relojCaja.hidden = true;
      document.getElementById("reloj-fin").hidden = false;
      return false;
    }

    const segundosTotales = Math.floor(falta / 1000);
    reloj.dias.textContent = dosDigitos(Math.floor(segundosTotales / 86400));
    reloj.horas.textContent = dosDigitos(Math.floor((segundosTotales % 86400) / 3600));
    reloj.minutos.textContent = dosDigitos(Math.floor((segundosTotales % 3600) / 60));
    reloj.segundos.textContent = dosDigitos(segundosTotales % 60);
    return true;
  };

  if (actualizarReloj()) {
    const intervalo = setInterval(function () {
      if (!actualizarReloj()) clearInterval(intervalo);
    }, 1000);
  }
}

// --- 2) Filtro del fixture ---
const botonFiltro = document.getElementById("filtro-uruguay");

if (botonFiltro) {
  const partidos = document.querySelectorAll(".partido");

  botonFiltro.addEventListener("click", function () {
    const activado = botonFiltro.getAttribute("aria-pressed") !== "true";
    botonFiltro.setAttribute("aria-pressed", String(activado));
    botonFiltro.textContent = activado ? "Mostrar todos los partidos" : "Mostrar solo a Uruguay";

    // Con el filtro activo se ocultan solo los partidos donde Uruguay no puede jugar.
    // Los del domingo ("quiza") quedan, porque dependen de la tabla.
    partidos.forEach(function (partido) {
      partido.hidden = activado && partido.dataset.uruguay === "no";
    });
  });
}
