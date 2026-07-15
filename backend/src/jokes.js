export const jokes = [
  {
    id: 1,
    setup: "Why don't scientists trust atoms?",
    punchline: "Because they make up everything."
  },
  {
    id: 2,
    setup: "What do you call fake spaghetti?",
    punchline: "An impasta."
  },
  {
    id: 3,
    setup: "Why did the scarecrow win an award?",
    punchline: "He was outstanding in his field."
  },
  {
    id: 4,
    setup: "What do you call cheese that isn't yours?",
    punchline: "Nacho cheese."
  },
  {
    id: 5,
    setup: "Why don't eggs tell jokes?",
    punchline: "They'd crack each other up."
  },
  {
    id: 6,
    setup: "What do you call a factory that makes okay products?",
    punchline: "A satisfactory."
  },
  {
    id: 7,
    setup: "Why did the bicycle fall over?",
    punchline: "Because it was two-tired."
  },
  {
    id: 8,
    setup: "What do you call a bear with no teeth?",
    punchline: "A gummy bear."
  }
];

export function getRandomJoke() {
  const index = Math.floor(Math.random() * jokes.length);
  return jokes[index];
}
