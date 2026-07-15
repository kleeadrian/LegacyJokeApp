import { Router } from "express";
import { jokes, getRandomJoke } from "./jokes.js";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "dadjoke-backend" });
});

router.get("/jokes", (_req, res) => {
  res.json({ count: jokes.length, jokes });
});

router.get("/jokes/random", (_req, res) => {
  res.json(getRandomJoke());
});

router.get("/jokes/:id", (req, res) => {
  const id = Number(req.params.id);
  const joke = jokes.find((item) => item.id === id);

  if (!joke) {
    return res.status(404).json({ error: "Joke not found" });
  }

  res.json(joke);
});

export default router;
