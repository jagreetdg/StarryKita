import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { MapPinIcon, UsersIcon } from "lucide-react";
import type { Venue } from "@shared/schema";

export default function VenueCard({ venue }: { venue: Venue }) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative">
        <img 
          src={venue.image} 
          alt={venue.name}
          className="object-cover w-full h-full"
        />
      </div>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">{venue.name}</h3>
            <p className="text-sm text-muted-foreground">{venue.genre}</p>
          </div>
          <Badge>{venue.capacity} seats</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <MapPinIcon className="h-4 w-4" />
          <span>{venue.address}</span>
        </div>
        <p className="line-clamp-2 text-sm">{venue.description}</p>
      </CardContent>
      <CardFooter>
        <Link href={`/venues/${venue.id}`}>
          <Button className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
