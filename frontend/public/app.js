const setupEl = document.getElementById("setup");
const punchlineEl = document.getElementById("punchline");
const statusEl = document.getElementById("status");
const ratingSummaryEl = document.getElementById("rating-summary");
const newJokeBtn = document.getElementById("new-joke-btn");
const ratingButtons = [...document.querySelectorAll(".rating-btn")];

let apiUrl = "http://localhost:3001";
let selectedRating = null;

async function loadConfig() {
  const response = await fetch("/config.json");
  const config = await response.json();
  apiUrl = config.apiUrl;
}

function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.classList.toggle("error", isError);
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
  for (const button of ratingButtons) {
    button.disabled = false;
  }
}

async function fetchRandomJoke() {
  setStatus("Fetching a fresh dad joke...");
  punchlineEl.textContent = "";
  resetRating();

  try {
    const response = await fetch(`${apiUrl}/api/jokes/random`);

    if (!response.ok) {
      throw new Error(`API responded with ${response.status}`);
    }

    const joke = await response.json();
    setupEl.textContent = joke.setup;
    punchlineEl.textContent = joke.punchline;
    enableRating();
    setStatus("Rate the joke below.");
  } catch (error) {
    setupEl.textContent = "Could not load a joke right now.";
    punchlineEl.textContent = "";
    setStatus(error.message, true);
  }
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

for (const button of ratingButtons) {
  button.setAttribute("role", "radio");
  button.setAttribute("aria-checked", "false");
  button.addEventListener("click", () => {
    selectRating(Number(button.dataset.rating));
  });
}

await loadConfig();
