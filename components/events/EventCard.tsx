import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, ArrowRight, Users } from "lucide-react";
import { Event } from '@/hooks/useEvents';
import { transformEvent, getEventTypeText, getRegionText } from '@/lib/utils/eventHelpers';

interface EventCardProps {
  event: Event;
  className?: string;
  showDescription?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ 
  event: rawEvent, 
  className = "", 
  showDescription = true 
}) => {
  // Transform the event data
  const event = transformEvent(rawEvent);

  return (
    <Card className={`flex flex-col overflow-hidden h-full shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out group ${className}`}>
      <div className="relative h-48 w-full overflow-hidden">
        {event.banner ? (
          <Image 
            src={event.banner} 
            alt={event.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out ${event.eventStatus === 'past' ? 'opacity-90' : ''}`} 
          />
        ) : (
          <div className="w-full h-full bg-muted/30 flex items-center justify-center">
            <Calendar className="h-10 w-10 text-muted-foreground/50" />
          </div>
        )}
        <div className="absolute top-4 left-4">
          <Badge className={event.eventStatus === 'past' 
            ? "bg-background/80 border-border text-foreground"
            : event.type === 'webinar' 
              ? "bg-accent text-white hover:bg-accent/90" 
              : "bg-primary text-white hover:bg-primary/90"
          }>
            {getEventTypeText(event.type)}
          </Badge>
        </div>
        <div className="absolute top-4 right-4">
          {event.eventStatus === 'past' ? (
            <Badge className="bg-muted text-foreground border border-border/50">
              Archive
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-background/80 border-border">
              {getRegionText(event.region)}
            </Badge>
          )}
        </div>
      </div>
      
      <CardHeader>
        <Link href={`/media/events/${event.slug}`} className="block hover:text-primary transition-colors">
          <CardTitle className="text-xl font-semibold leading-tight group-hover:text-primary transition-colors">
            {event.title}
          </CardTitle>
        </Link>
      </CardHeader>
      
      <CardContent className="flex-grow">
        {showDescription && (
          <p className="text-muted-foreground mb-4 line-clamp-3">
            {event.description}
          </p>
        )}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-accent" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-accent" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-accent" />
            <span>{event.venue}</span>
          </div>
          {event.availableSpots !== undefined && event.eventStatus === 'upcoming' && (
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-accent" />
              <span>{event.availableSpots} spots available</span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button asChild variant="ghost" size="sm" className="group/button w-full justify-start p-0">
          <Link href={`/media/events/${event.slug}`} className="flex items-center text-primary hover:text-primary/90">
            {event.eventStatus === 'past' ? 'View Archive' : event.registrationStatusText}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard; 