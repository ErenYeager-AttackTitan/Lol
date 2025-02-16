# RyuuStream - Anime Streaming Platform

## Database Schema

```sql
-- Animes Table
CREATE TABLE animes (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    cover_image TEXT NOT NULL,
    total_episodes INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE episodes (
    id SERIAL PRIMARY KEY,
    anime_id INTEGER NOT NULL REFERENCES animes(id),
    episode_number INTEGER NOT NULL,
    iframe_url TEXT NOT NULL,
    title TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_anime_title ON animes(title);
CREATE INDEX idx_episodes_anime_id ON episodes(anime_id);
```

## Features
- Browse anime catalog
- Search functionality
- Episode streaming via iframes
- Admin panel for content management
```

Note: The actual schema is managed through Drizzle ORM, this SQL is for reference purposes only.
