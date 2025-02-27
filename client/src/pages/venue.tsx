import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MapPinIcon, 
  PhoneIcon, 
  GlobeIcon, 
  ClockIcon, 
  StarIcon, 
  MessageSquareIcon,
  ImageIcon
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import type { Venue, Event } from "@shared/schema";
import { useTranslations } from "@/lib/translations/context";
import EventCard from "@/components/event-card";

export default function VenuePage() {
  const { id } = useParams();
  const [location] = useLocation();
  const { t } = useTranslations();

  const { data: venue } = useQuery<Venue>({
    queryKey: [`/api/venues/${id}`]
  });

  const { data: events } = useQuery<Event[]>({
    queryKey: [`/api/venues/${id}/events`]
  });

  if (!venue) return null;

  return (
    <div className="space-y-8">
      <Carousel className="w-full">
        <CarouselContent>
          <CarouselItem>
            <div className="aspect-[21/9] overflow-hidden rounded-lg">
              <img 
                src={venue.image} 
                alt={venue.name}
                className="w-full h-full object-cover"
              />
            </div>
          </CarouselItem>
          {venue.additionalImages?.map((image, index) => (
            <CarouselItem key={index}>
              <div className="aspect-[21/9] overflow-hidden rounded-lg">
                <img 
                  src={image} 
                  alt={`${venue.name} - Image ${index + 2}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">{venue.name}</h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPinIcon className="h-4 w-4" />
                <span>{venue.address}</span>
              </div>
              {venue.rating && (
                <div className="flex items-center gap-1">
                  <StarIcon className="h-4 w-4 text-yellow-400" />
                  <span>{venue.rating}</span>
                  <span className="text-sm">({venue.reviewCount} reviews)</span>
                </div>
              )}
            </div>
          </div>

          <div className="prose max-w-none">
            <p>{venue.description}</p>
          </div>

          {venue.reviews && venue.reviews.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <MessageSquareIcon className="h-5 w-5" />
                Reviews
              </h2>
              <div className="space-y-4">
                {venue.reviews.map((review, i) => (
                  <Card key={i} className="p-4">
                    <p className="text-sm">{review}</p>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {events && events.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <ClockIcon className="h-5 w-5" />
                {t('events', 'title')}
              </h2>
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
            <h3 className="font-semibold mb-2">{t('venue', 'details')}</h3>
            <dl className="space-y-2">
              <div>
                <dt className="text-sm font-medium">{t('venue', 'genre')}</dt>
                <dd>{venue.genre}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium">{t('venue', 'capacity')}</dt>
                <dd>{venue.capacity} {t('venue', 'capacityUnit')}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium">Opening Hours</dt>
                <dd className="flex items-center gap-2">
                  <ClockIcon className="h-4 w-4" />
                  {venue.openingHours}
                </dd>
              </div>
              {venue.popularTimes && (
                <div>
                  <dt className="text-sm font-medium">Popular Times</dt>
                  <dd>{venue.popularTimes}</dd>
                </div>
              )}
            </dl>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-2">{t('venue', 'features')}</h3>
            <div className="flex flex-wrap gap-2">
              {venue.features.map((feature, i) => (
                <Badge key={i} variant="secondary">{feature}</Badge>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-2">{t('venue', 'contact')}</h3>
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
                  <span>{t('venue', 'website')}</span>
                </a>
              )}
              {venue.googleMapsUrl && (
                <a href={venue.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-primary">
                  <MapPinIcon className="h-4 w-4" />
                  <span>View on Google Maps</span>
                </a>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}