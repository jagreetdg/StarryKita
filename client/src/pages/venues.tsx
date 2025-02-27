import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import VenueCard from "@/components/venue-card";
import SearchFilter from "@/components/search-filter";
import type { Venue } from "@shared/schema";

export default function Venues() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("all");
  const [type, setType] = useState("all");

  const { data: venues, isLoading } = useQuery<Venue[]>({
    queryKey: ["/api/venues"]
  });

  const filteredVenues = venues?.filter(venue => {
    const matchesSearch = venue.name.toLowerCase().includes(search.toLowerCase()) ||
      venue.description.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = genre === "all" || venue.genre.toLowerCase() === genre;
    const matchesType = type === "all" || venue.type === type;
    return matchesSearch && matchesGenre && matchesType;
  });

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-6">Venues in Shimokitazawa</h1>

      <SearchFilter
        search={search}
        onSearchChange={setSearch}
        genre={genre}
        onGenreChange={setGenre}
        type={type}
        onTypeChange={setType}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVenues?.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>
    </div>
  );
}