import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Card } from "@/components/ui/card";
import EventCard from "@/components/event-card";
import { Badge } from "@/components/ui/badge";
import { MapPinIcon, PhoneIcon, GlobeIcon } from "lucide-react";
import type { Venue, Event } from "@shared/schema";

export default function VenuePage() {
  const { id } = useParams();

  const { data: venue } = useQuery<Venue>({
    queryKey: [`/api/venues/${id}`]
  });

  const { data: events } = useQuery<Event[]>({
    queryKey: [`/api/venues/${id}/events`]
  });

  if (!venue) return null;

  return (
    <div className="space-y-8">
      <div className="aspect-[21/9] overflow-hidden rounded-lg">
        <img 
          src={venue.image} 
          alt={venue.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">{venue.name}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPinIcon className="h-4 w-4" />
              <span>{venue.address}</span>
            </div>
          </div>

          <div className="prose max-w-none">
            <p>{venue.description}</p>
          </div>

          {events && events.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
              <div className="grid gap-6">
                {events.map((event) => (
                  <EventCard key={event.id} event={event} venue={venue} />
                ))}
              </div>
            </div>
          )}
        </div>

        <Card className="p-6 space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Venue Details</h3>
            <dl className="space-y-2">
              <div>
                <dt className="text-sm font-medium">Genre</dt>
                <dd>{venue.genre}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium">Capacity</dt>
                <dd>{venue.capacity} people</dd>
              </div>
            </dl>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Features</h3>
            <div className="flex flex-wrap gap-2">
              {venue.features.map((feature, i) => (
                <Badge key={i} variant="secondary">{feature}</Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Contact</h3>
            <div className="space-y-2">
              {venue.phone && (
                <a href={`tel:${venue.phone}`} className="flex items-center gap-2 text-sm hover:text-primary">
                  <PhoneIcon className="h-4 w-4" />
                  <span>{venue.phone}</span>
                </a>
              )}
              {venue.website && (
                <a href={venue.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-primary">
                  <GlobeIcon className="h-4 w-4" />
                  <span>Website</span>
                </a>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
