import { useQuery } from "@tanstack/react-query";
import { SearchBar } from "@/components/SearchBar";
import { AnimeGrid } from "@/components/AnimeGrid";
import { useState, useEffect } from "react";
import type { Anime } from "@shared/schema";
import { queryClient } from "@/lib/queryClient";

export default function Home() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const { data: animes = [], isLoading } = useQuery<Anime[]>({
    queryKey: [debouncedSearch ? `/api/animes/search?q=${debouncedSearch}` : "/api/animes"],
  });

  // Prefetch the next results
  useEffect(() => {
    if (debouncedSearch) {
      queryClient.prefetchQuery({
        queryKey: [`/api/animes/search?q=${debouncedSearch}`],
      });
    }
  }, [debouncedSearch]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
          RyuuStream
        </h1>

        <SearchBar value={search} onChange={setSearch} className="mb-8" />

        <AnimeGrid animes={animes} isLoading={isLoading} />
      </div>
    </div>
  );
}