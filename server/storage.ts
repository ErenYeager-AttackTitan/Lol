import { eq, sql } from "drizzle-orm";
import { db } from "./db";
import { animes, episodes } from "@shared/schema";
import type { Anime, Episode, InsertAnime, InsertEpisode } from "@shared/schema";

export interface IStorage {
  // Anime operations
  getAnimes(): Promise<Anime[]>;
  getAnime(id: number): Promise<Anime | undefined>;
  createAnime(anime: InsertAnime): Promise<Anime>;
  searchAnimes(query: string): Promise<Anime[]>;

  // Episode operations
  getEpisode(id: number): Promise<Episode | undefined>;
  getEpisodesByAnime(animeId: number): Promise<Episode[]>;
  createEpisode(episode: InsertEpisode): Promise<Episode>;
}

export class DatabaseStorage implements IStorage {
  async getAnimes(): Promise<Anime[]> {
    return await db.select().from(animes);
  }

  async getAnime(id: number): Promise<Anime | undefined> {
    const [anime] = await db.select().from(animes).where(eq(animes.id, id));
    return anime;
  }

  async createAnime(insertAnime: InsertAnime): Promise<Anime> {
    const [anime] = await db.insert(animes).values(insertAnime).returning();
    return anime;
  }

  async searchAnimes(query: string): Promise<Anime[]> {
    return await db
      .select()
      .from(animes)
      .where(sql`${animes.title} ILIKE ${`%${query}%`}`);
  }

  async getEpisode(id: number): Promise<Episode | undefined> {
    const [episode] = await db.select().from(episodes).where(eq(episodes.id, id));
    return episode;
  }

  async getEpisodesByAnime(animeId: number): Promise<Episode[]> {
    return await db
      .select()
      .from(episodes)
      .where(eq(episodes.animeId, animeId))
      .orderBy(episodes.episodeNumber);
  }

  async createEpisode(insertEpisode: InsertEpisode): Promise<Episode> {
    const [episode] = await db.insert(episodes).values(insertEpisode).returning();
    return episode;
  }
}

export const storage = new DatabaseStorage();