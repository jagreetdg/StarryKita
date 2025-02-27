import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { MapPinIcon, ClockIcon, BanknoteIcon } from "lucide-react";
import type { Venue } from "@shared/schema";

const venueTypeLabels = {
  live_house: "Live House",
  bar: "Bar",
  club: "Club"
};

export default function VenueCard({ venue }: { venue: Venue }) {
  const baseRoute = venue.type === "live_house" ? "/live" : "/bars";

  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative">
        <img 
          src={venue.image} 
          alt={venue.name}
          className="object-cover w-full h-full"
        />
        <Badge className="absolute top-2 right-2">{venueTypeLabels[venue.type as keyof typeof venueTypeLabels]}</Badge>
      </div>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">{venue.name}</h3>
            <p className="text-sm text-muted-foreground">{venue.genre}</p>
          </div>
          <Badge variant="secondary">{venue.capacity} seats</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPinIcon className="h-4 w-4" />
            <span>{venue.address}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ClockIcon className="h-4 w-4" />
            <span>{venue.openingHours}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <BanknoteIcon className="h-4 w-4" />
            <span>{venue.priceRange}</span>
          </div>
          <p className="line-clamp-2 text-sm mt-2">{venue.description}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`${baseRoute}/${venue.id}`}>
          <Button className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}