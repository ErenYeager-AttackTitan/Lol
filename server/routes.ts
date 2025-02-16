import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertAnimeSchema, insertEpisodeSchema } from "@shared/schema";

export async function registerRoutes(app: Express) {
  // Anime routes
  app.get("/api/animes", async (_req, res) => {
    const animes = await storage.getAnimes();
    res.json(animes);
  });

  app.get("/api/animes/search", async (req, res) => {
    const query = req.query.q as string || "";
    const animes = await storage.searchAnimes(query);
    res.json(animes);
  });

  app.get("/api/animes/:id", async (req, res) => {
    const anime = await storage.getAnime(parseInt(req.params.id));
    if (!anime) return res.status(404).json({ message: "Anime not found" });
    res.json(anime);
  });

  app.post("/api/animes", async (req, res) => {
    const parsed = insertAnimeSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid anime data" });
    }
    const anime = await storage.createAnime(parsed.data);
    res.json(anime);
  });

  // Episode routes
  app.get("/api/animes/:animeId/episodes", async (req, res) => {
    const episodes = await storage.getEpisodesByAnime(parseInt(req.params.animeId));
    res.json(episodes);
  });

  app.get("/api/episodes/:id", async (req, res) => {
    const episode = await storage.getEpisode(parseInt(req.params.id));
    if (!episode) return res.status(404).json({ message: "Episode not found" });
    res.json(episode);
  });

  app.post("/api/episodes", async (req, res) => {
    const parsed = insertEpisodeSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid episode data" });
    }
    const episode = await storage.createEpisode(parsed.data);
    res.json(episode);
  });

  return createServer(app);
}
