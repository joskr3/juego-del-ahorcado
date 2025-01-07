// @ts-nocheck
const palabras = ["Bombardero", "Cafe", "Combate", "Boluarte", "Todes", "tasa"];

let palabraSecreta = "";
let estado = [];
let fallos = 0;
let letrasErroneas = [];
const maxFallos = 6;

let estadoPalabra = document.getElementById("estadoPalabra");

let elementoFallos = document.getElementById("fallos");

let elementoLetrasErroneas = document.getElementById("letrasErroneas");

let mensajeFinal = document.getElementById("mensajeFinal");

const btnReiniciar = document.getElementById("btnReiniciar");

btnReiniciar?.addEventListener("click", iniciarJuego);

function iniciarJuego() {
  const indice = Math.floor(Math.random() * palabras.length);
  palabraSecreta = palabras[indice];
  alert(palabraSecreta);
  estado = [];

  for (let index = 0; index < palabraSecreta.length; index++) {
    estado.push("_");
  }
  fallos = 0;
  letrasErroneas = [];
  actualizarDOM();
}

function actualizarDOM() {
  estadoPalabra.textContent = estado.join(" ");
  elementoFallos.textContent = fallos;
  elementoLetrasErroneas.textContent = letrasErroneas.join(" ");
  if (mensajeFinal) {
    mensajeFinal.textContent = "";
  }
}

window.addEventListener("DOMContentLoaded", iniciarJuego);

window.addEventListener("keydown", (evento) => {
  let letra = evento.key.toUpperCase();
  if (/[A-Z]/.test(letra) && letra.length === 1) {
    procesarLetra(letra);
  }
});

function procesarLetra(letra) {
  if (estado.includes(letra) || letrasErroneas.includes(letra)) {
    return;
  }

  let acierto = false;

  for (let index = 0; index < palabraSecreta.length; index++) {
    if (palabraSecreta[index] === letra) {
      estado[index] = letra;
      acierto = true;
    }
  }

  if (!acierto) {
    fallos++;
    letrasErroneas.push(letra);
  }
  actualizarDOM();
  revisarFinDeJuego();
}

function revisarFinDeJuego() {
  if (fallos >= maxFallos) {
    mensajeFinal.textContent = `Perdiste! La palabra era : ${palabraSecreta}`;
    //bloquearInteraccion();
  } else if (!estado.includes("_")) {
    mensajeFinal.textContent = `Ganaste!!!`;
    //bloquearInteraccion();
  }
}

// function bloquearInteraccion() {

// }
