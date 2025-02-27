import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon, MapPinIcon, BanknoteIcon } from "lucide-react";
import { format } from "date-fns";
import type { Event, Venue } from "@shared/schema";

interface EventCardProps {
  event: Event;
  venue: Venue;
}

export default function EventCard({ event, venue }: EventCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative">
        <img 
          src={event.image} 
          alt={event.title}
          className="object-cover w-full h-full"
        />
      </div>
      <CardHeader>
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">{event.title}</h3>
          <div className="flex items-center gap-2 text-sm">
            <CalendarIcon className="h-4 w-4" />
            <span>{format(new Date(event.date), "PPP 'at' p")}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <MapPinIcon className="h-4 w-4" />
            <span>{venue.name}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <BanknoteIcon className="h-4 w-4" />
            <span>¥{event.price.toLocaleString()}</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {event.performers.map((performer, i) => (
              <Badge key={i} variant="secondary">{performer}</Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
