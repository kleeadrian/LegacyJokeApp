const setupEl = document.getElementById("setup");
const punchlineEl = document.getElementById("punchline");
const statusEl = document.getElementById("status");
const newJokeBtn = document.getElementById("new-joke-btn");
const revealBtn = document.getElementById("reveal-btn");

let apiUrl = "http://localhost:3001";

async function loadConfig() {
  const response = await fetch("/config.json");
  const config = await response.json();
  apiUrl = config.apiUrl;
}

function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.classList.toggle("error", isError);
}

function resetPunchline() {
  punchlineEl.textContent = "";
  punchlineEl.classList.add("hidden");
  revealBtn.disabled = true;
}

async function fetchRandomJoke() {
  setStatus("Fetching a fresh dad joke...");
  resetPunchline();

  try {
    const response = await fetch(`${apiUrl}/api/jokes/random`);

    if (!response.ok) {
      throw new Error(`API responded with ${response.status}`);
    }

    const joke = await response.json();
    setupEl.textContent = joke.setup;
    punchlineEl.textContent = joke.punchline;
    revealBtn.disabled = false;
    setStatus("Ready when you are.");
  } catch (error) {
    setupEl.textContent = "Could not load a joke right now.";
    setStatus(error.message, true);
  }
}

function revealPunchline() {
  punchlineEl.classList.remove("hidden");
  revealBtn.disabled = true;
  setStatus("Groan responsibly.");
}

newJokeBtn.addEventListener("click", fetchRandomJoke);
revealBtn.addEventListener("click", revealPunchline);

await loadConfig();
