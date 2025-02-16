import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const animes = pgTable("animes", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  coverImage: text("cover_image").notNull(),
  totalEpisodes: integer("total_episodes").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const episodes = pgTable("episodes", {
  id: serial("id").primaryKey(),
  animeId: integer("anime_id")
    .references(() => animes.id)
    .notNull(),
  episodeNumber: integer("episode_number").notNull(),
  iframeUrl: text("iframe_url").notNull(),
  title: text("title").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAnimeSchema = createInsertSchema(animes).omit({ 
  id: true,
  createdAt: true
});

export const insertEpisodeSchema = createInsertSchema(episodes).omit({ 
  id: true,
  createdAt: true 
});

export type InsertAnime = z.infer<typeof insertAnimeSchema>;
export type InsertEpisode = z.infer<typeof insertEpisodeSchema>;
export type Anime = typeof animes.$inferSelect;
export type Episode = typeof episodes.$inferSelect;