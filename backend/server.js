// backend/server.js
import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());

// Route: Permanently free-to-play games (FreeToGame)
app.get("/api/freegames", async (req, res) => {
  try {
    const response = await axios.get("https://www.freetogame.com/api/games");
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch free games" });
  }
});

// Start server
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
