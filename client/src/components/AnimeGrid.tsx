import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Anime } from "@shared/schema";

interface AnimeGridProps {
  animes: Anime[];
  isLoading: boolean;
}

export function AnimeGrid({ animes, isLoading }: AnimeGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i}>
            <Skeleton className="h-[200px]" />
            <CardContent className="p-4">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {animes.map((anime) => (
        <a key={anime.id} href={`/watch/${anime.id}/1`}>
          <Card className="hover:scale-105 transition-transform">
            <div 
              className="h-[200px] bg-cover bg-center rounded-t-lg"
              style={{ backgroundImage: `url(${anime.coverImage})` }}
            />
            <CardContent className="p-4">
              <h2 className="font-semibold mb-2">{anime.title}</h2>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {anime.description}
              </p>
            </CardContent>
          </Card>
        </a>
      ))}
    </div>
  );
}
