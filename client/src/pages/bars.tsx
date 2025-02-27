import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import VenueCard from "@/components/venue-card";
import SearchFilter from "@/components/search-filter";
import { useTranslations } from "@/lib/translations/context";
import type { Venue } from "@shared/schema";

export default function Bars() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("all");
  const { t } = useTranslations();

  const { data: venues } = useQuery<Venue[]>({
    queryKey: ["/api/venues"]
  });

  const bars = venues?.filter(venue => venue.type === "bar");
  const filteredBars = bars?.filter(bar => {
    const matchesSearch = bar.name.toLowerCase().includes(search.toLowerCase()) ||
      bar.description.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = genre === "all" || bar.genre.toLowerCase() === genre;
    return matchesSearch && matchesGenre;
  });

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-6">{t('bars', 'title')}</h1>
      
      <SearchFilter
        search={search}
        onSearchChange={setSearch}
        genre={genre}
        onGenreChange={setGenre}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBars?.map((bar) => (
          <VenueCard key={bar.id} venue={bar} />
        ))}
      </div>
    </div>
  );
}
