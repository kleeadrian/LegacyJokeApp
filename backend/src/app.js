import express from "express";
import cors from "cors";
import routes from "./routes.js";

const app = express();
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:3000";

app.use(cors({ origin: FRONTEND_ORIGIN }));
app.use(express.json());

app.use("/api", routes);

app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

export default app;
