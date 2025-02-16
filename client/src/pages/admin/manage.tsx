import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertAnimeSchema, insertEpisodeSchema, type Anime } from "@shared/schema";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Manage() {
  const { toast } = useToast();
  const animeForm = useForm({
    resolver: zodResolver(insertAnimeSchema),
    defaultValues: {
      title: "",
      description: "",
      coverImage: "",
      totalEpisodes: 0,
    },
  });

  const episodeForm = useForm({
    resolver: zodResolver(insertEpisodeSchema),
    defaultValues: {
      animeId: 0,
      episodeNumber: 1,
      title: "",
      iframeUrl: "",
    },
  });

  const { data: animes = [] } = useQuery<Anime[]>({
    queryKey: ["/api/animes"],
  });

  const addAnimeMutation = useMutation({
    mutationFn: async (data: any) => {
      await apiRequest("POST", "/api/animes", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/animes"] });
      toast({ title: "Anime added successfully" });
      animeForm.reset();
    },
  });

  const addEpisodeMutation = useMutation({
    mutationFn: async (data: any) => {
      await apiRequest("POST", "/api/episodes", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/animes"] });
      toast({ title: "Episode added successfully" });
      episodeForm.reset();
    },
  });

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Add Anime</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...animeForm}>
              <form onSubmit={animeForm.handleSubmit((data) => addAnimeMutation.mutate(data))}>
                <div className="space-y-4">
                  <Input {...animeForm.register("title")} placeholder="Title" />
                  <Input {...animeForm.register("description")} placeholder="Description" />
                  <Input {...animeForm.register("coverImage")} placeholder="Cover Image URL" />
                  <Input 
                    type="number" 
                    {...animeForm.register("totalEpisodes", { valueAsNumber: true })} 
                    placeholder="Total Episodes" 
                  />
                  <Button type="submit" disabled={addAnimeMutation.isPending}>
                    Add Anime
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Add Episode</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...episodeForm}>
              <form onSubmit={episodeForm.handleSubmit((data) => addEpisodeMutation.mutate(data))}>
                <div className="space-y-4">
                  <select 
                    {...episodeForm.register("animeId", { valueAsNumber: true })}
                    className="w-full p-2 rounded border"
                  >
                    <option value="">Select Anime</option>
                    {animes.map((anime) => (
                      <option key={anime.id} value={anime.id}>
                        {anime.title}
                      </option>
                    ))}
                  </select>
                  <Input 
                    type="number"
                    {...episodeForm.register("episodeNumber", { valueAsNumber: true })}
                    placeholder="Episode Number"
                  />
                  <Input {...episodeForm.register("title")} placeholder="Episode Title" />
                  <Input {...episodeForm.register("iframeUrl")} placeholder="Iframe URL" />
                  <Button type="submit" disabled={addEpisodeMutation.isPending}>
                    Add Episode
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}