import { useQuery } from "@tanstack/react-query";
import { VideoPlayer } from "@/components/VideoPlayer";
import type { Anime, Episode } from "@shared/schema";
import { useParams } from "wouter";

export default function Watch() {
  const { animeId, episodeId } = useParams();

  const { data: anime } = useQuery<Anime>({
    queryKey: [`/api/animes/${animeId}`],
  });

  const { data: episodes = [] } = useQuery<Episode[]>({
    queryKey: [`/api/animes/${animeId}/episodes`],
  });

  const { data: currentEpisode } = useQuery<Episode>({
    queryKey: [`/api/episodes/${episodeId}`],
  });

  if (!anime || !episodes || !currentEpisode) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">{anime.title}</h1>
        <h2 className="text-xl mb-4">Episode {currentEpisode.episodeNumber}</h2>

        <VideoPlayer iframeUrl={currentEpisode.iframeUrl} />

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Episodes</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
            {episodes.map((episode) => (
              <a
                key={episode.id}
                href={`/watch/${animeId}/${episode.id}`}
                className={`p-2 text-center rounded ${
                  episode.id === currentEpisode.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-card hover:bg-accent"
                }`}
              >
                {episode.episodeNumber}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}