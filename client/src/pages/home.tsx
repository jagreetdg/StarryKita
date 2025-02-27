import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import VenueCard from "@/components/venue-card";
import EventCard from "@/components/event-card";
import type { Venue, Event } from "@shared/schema";

export default function Home() {
  const { data: venues, isLoading: venuesLoading } = useQuery<Venue[]>({
    queryKey: ["/api/venues"]
  });

  const { data: events, isLoading: eventsLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"]
  });

  const featuredVenues = venues?.slice(0, 3);
  const upcomingEvents = events?.slice(0, 3);

  return (
    <div className="space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tighter">
          Discover Shimokitazawa's Music Scene
        </h1>
        <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
          Your guide to the best live houses, bars, and events in Tokyo's most vibrant music neighborhood
        </p>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold tracking-tight">Featured Venues</h2>
          <Link href="/venues">
            <Button variant="ghost">View All</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredVenues?.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold tracking-tight">Upcoming Events</h2>
          <Link href="/events">
            <Button variant="ghost">View All</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents?.map((event) => (
            <EventCard 
              key={event.id} 
              event={event} 
              venue={venues?.find(v => v.id === event.venueId)!} 
            />
          ))}
        </div>
      </section>
    </div>
  );
}
