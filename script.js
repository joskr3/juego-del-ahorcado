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

// let mensajeFinal = document.getElementById("mensajeFinal");

const btnReiniciar = document.getElementById("btnReiniciar");

const titulo = document.getElementsByTagName("h1")[0];

const nuevoMensajeFinal = document.createElement("p");

nuevoMensajeFinal.id = "mensajeFinal";

nuevoMensajeFinal.textContent = "Mensaje Final: ";

if (btnReiniciar) {
  btnReiniciar.addEventListener("click", iniciarJuego);
}

function iniciarJuego() {
  titulo.style.color = "black";
  const indice = Math.floor(Math.random() * palabras.length);
  palabraSecreta = palabras[indice].toLocaleUpperCase();
  console.log(palabraSecreta);
  // alert(palabraSecreta);
  estado = [];

  for (let index = 0; index < palabraSecreta.length; index++) {
    estado.push("_");
  }
  fallos = 0;
  letrasErroneas = [];
  actualizarDOM();
}

function actualizarDOM() {
  if (estadoPalabra) {
    estadoPalabra.textContent = estado.join(" ");
  }

  if (elementoFallos) {
    elementoFallos.textContent = fallos;
  }

  if (elementoLetrasErroneas) {
    elementoLetrasErroneas.textContent = letrasErroneas.join(" ");
  }

  if (nuevoMensajeFinal) {
    nuevoMensajeFinal.textContent = "";
  }
}

window.document.getElementsByTagName("body")[0].appendChild(nuevoMensajeFinal);

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

function reiniciarJuego(texto, delay) {
  setTimeout(() => {
    alert(texto);
    iniciarJuego();
  }, delay);
}

function revisarFinDeJuego() {
  if (fallos >= maxFallos) {
    // console.log(mensajeFinal, "Perdiste(1)");
    alert("Perdiste");

    nuevoMensajeFinal.textContent = `Perdiste! La palabra era : ${palabraSecreta}`;

    titulo.style.color = "red";

    reiniciarJuego("Perdiste!!", 4000);

    //bloquearInteraccion();
  } else if (!estado.includes("_")) {
    titulo.style.color = "green";
    //console.log(mensajeFinal, "Ganaste(2)");
    nuevoMensajeFinal.textContent = `Ganaste!!!`;
    //bloquearInteraccion();
    reiniciarJuego("Ganaste!!", 2000);
  }
}

// function bloquearInteraccion() {

// }
