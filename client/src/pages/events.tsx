import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import EventCard from "@/components/event-card";
import SearchFilter from "@/components/search-filter";
import type { Event, Venue } from "@shared/schema";

export default function Events() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("all");

  const { data: events } = useQuery<Event[]>({
    queryKey: ["/api/events"]
  });

  const { data: venues } = useQuery<Venue[]>({
    queryKey: ["/api/venues"]
  });

  const filteredEvents = events?.filter(event => {
    const venue = venues?.find(v => v.id === event.venueId);
    const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.description.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = genre === "all" || venue?.genre.toLowerCase() === genre;
    return matchesSearch && matchesGenre;
  });

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-6">Upcoming Events</h1>
      
      <SearchFilter
        search={search}
        onSearchChange={setSearch}
        genre={genre}
        onGenreChange={setGenre}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents?.map((event) => (
          <EventCard 
            key={event.id} 
            event={event} 
            venue={venues?.find(v => v.id === event.venueId)!}
          />
        ))}
      </div>
    </div>
  );
}
