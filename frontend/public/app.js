const setupEl = document.getElementById("setup");
const punchlineEl = document.getElementById("punchline");
const statusEl = document.getElementById("status");
const ratingSectionEl = document.getElementById("rating-section");
const ratingSummaryEl = document.getElementById("rating-summary");
const newJokeBtn = document.getElementById("new-joke-btn");
const revealBtn = document.getElementById("reveal-btn");
const ratingButtons = [...document.querySelectorAll(".rating-btn")];

let apiUrl = "http://localhost:3001";
let selectedRating = null;
let currentPunchline = "";

async function loadConfig() {
  const response = await fetch("/config.json");
  const config = await response.json();
  apiUrl = config.apiUrl;
}

function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.classList.toggle("error", isError);
}

function hidePunchline() {
  punchlineEl.textContent = "";
  punchlineEl.classList.add("is-hidden");
  revealBtn.disabled = true;
  ratingSectionEl.classList.add("is-hidden");
}

function resetRating() {
  selectedRating = null;
  ratingSummaryEl.textContent = "";

  for (const button of ratingButtons) {
    button.disabled = true;
    button.classList.remove("selected");
    button.setAttribute("aria-checked", "false");
  }
}

function enableRating() {
  ratingSectionEl.classList.remove("is-hidden");

  for (const button of ratingButtons) {
    button.disabled = false;
  }
}

async function fetchRandomJoke() {
  setStatus("Fetching a fresh dad joke...");
  hidePunchline();
  resetRating();
  currentPunchline = "";

  try {
    const response = await fetch(`${apiUrl}/api/jokes/random`);

    if (!response.ok) {
      throw new Error(`API responded with ${response.status}`);
    }

    const joke = await response.json();
    setupEl.textContent = joke.setup;
    currentPunchline = joke.punchline;
    revealBtn.disabled = false;
    setStatus("Punchline hidden. Reveal it when you are ready.");
  } catch (error) {
    setupEl.textContent = "Could not load a joke right now.";
    setStatus(error.message, true);
  }
}

function revealPunchline() {
  if (!currentPunchline) {
    return;
  }

  punchlineEl.textContent = currentPunchline;
  punchlineEl.classList.remove("is-hidden");
  revealBtn.disabled = true;
  enableRating();
  setStatus("Thanks for playing along.");
}

function selectRating(rating) {
  selectedRating = rating;

  for (const button of ratingButtons) {
    const isSelected = Number(button.dataset.rating) === rating;
    button.classList.toggle("selected", isSelected);
    button.setAttribute("aria-checked", String(isSelected));
  }

  ratingSummaryEl.textContent = `You rated this joke ${rating} out of 5.`;
  setStatus("Thanks for the feedback.");
}

newJokeBtn.addEventListener("click", fetchRandomJoke);
revealBtn.addEventListener("click", revealPunchline);

for (const button of ratingButtons) {
  button.setAttribute("role", "radio");
  button.setAttribute("aria-checked", "false");
  button.addEventListener("click", () => {
    selectRating(Number(button.dataset.rating));
  });
}

await loadConfig();
