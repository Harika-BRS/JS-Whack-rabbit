/** 
Author: Build Rise Shine with Nyros (BRS) 
Created: 2023 
Library / Component: Script file
Description: Click and Drag
(c) Copyright by BRS with Nyros. 
**/

// Get DOM elements
const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
const timer = document.getElementById("timer");
let gameStartBtn = document.getElementById("gameStartBtn");
let ms = 20000;

// Initialize variables
let lastHole;
let timeUp = false;
let score = 0;

// Default theme
let chathams_blue = "#1A4B84";

// Function to generate a random time interval between min and max values
function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// Function to randomly select a hole from the available holes
function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

// Function to make a mole appear (pop up from a hole)
function peep() {
  const time = randomTime(200, 1000);
  const hole = randomHole(holes);
  hole.classList.add("up");

  // Hide the mole after a random time interval
  setTimeout(() => {
    hole.classList.remove("up");
    if (!timeUp) peep(); // If the game time is not up, continue showing moles
  }, time);
}

// updateSeconds
function updateSeconds() {
  ms = ms - 1000;
  const seconds = Math.floor(ms / 1000);
  console.log(seconds);
  timer.innerText = `Time ${seconds} seconds left`;
}

// Function to start the game
function startGame() {
  timer.classList.remove("text-danger");
  const gameInterval = setInterval(updateSeconds, 1000);
  gameStartBtn.style.display = "none";
  scoreBoard.textContent = `Score: 0`;
  timeUp = false;
  score = 0;
  peep();
  setTimeout(() => {
    timeUp = true;
    clearInterval(gameInterval);
    ms = 20000;
    timer.classList.add("text-danger");
    timer.innerText = `Time up`;
    gameStartBtn.style.display = "inline-block";
  }, 20000); // 20 seconds for the game duration
}

// Function to handle a mole being "bonked" (clicked on)
function bonk(e) {
  console.log(e);
  if (!e.isTrusted || timeUp) return; // Check if the click event is trusted and the game is not over
  score++;
  this.classList.remove("up");
  scoreBoard.textContent = `Score: ${score}`;
}
// Add event listener for each mole to listen for clicks (bonks)
moles.forEach((mole) => mole.addEventListener("click", bonk));

// Set the Theme
// Function to change the theme by updating CSS variables and storing the selected theme in local storage
function setTheme(theme) {
  document.documentElement.style.setProperty("--primary-color", theme);
  localStorage.setItem("movie-theme", theme);
}

// Set the initial theme to the value stored in local storage or the default 'chathams_blue'
setTheme(localStorage.getItem("movie-theme") || chathams_blue);
