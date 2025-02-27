import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import VenueCard from "@/components/venue-card";
import SearchFilter from "@/components/search-filter";
import { useTranslations } from "@/lib/translations/context";
import type { Venue } from "@shared/schema";

export default function Live() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("all");
  const { t } = useTranslations();

  const { data: venues } = useQuery<Venue[]>({
    queryKey: ["/api/venues"]
  });

  const liveHouses = venues?.filter(venue => venue.type === "live_house");
  const filteredLiveHouses = liveHouses?.filter(liveHouse => {
    const matchesSearch = liveHouse.name.toLowerCase().includes(search.toLowerCase()) ||
      liveHouse.description.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = genre === "all" || liveHouse.genre.toLowerCase() === genre;
    return matchesSearch && matchesGenre;
  });

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-6">{t('live', 'title')}</h1>
      
      <SearchFilter
        search={search}
        onSearchChange={setSearch}
        genre={genre}
        onGenreChange={setGenre}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLiveHouses?.map((liveHouse) => (
          <VenueCard key={liveHouse.id} venue={liveHouse} />
        ))}
      </div>
    </div>
  );
}
