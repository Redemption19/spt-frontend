'use client';

import React, { useState } from 'react';
import EventRegistrationForm from '@/components/events/EventRegistrationForm';
import EventCountdown from '@/components/events/EventCountdown';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, MapPin, Users, Download, Video, ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { addToCalendar } from '@/lib/utils/calendar';
import { useEvent } from '@/hooks/useEvent';
import { transformEvent, getEventTypeText, getRegionText } from '@/lib/utils/eventHelpers';

interface Props {
  params: {
    slug: string;
  };
}

// Helper function to format date for calendar links
const formatForCalendar = (dateStr: string, timeStr: string): { start: string; end: string } | null => {
  try {
    const [monthDayYear, ...timeParts] = dateStr.split(' ');
    const timeRange = timeParts.join(' ') + ' ' + timeStr;

    const [startTime, endTime] = timeRange.split(' - ').map(t => t.trim());

    const startDateTimeStr = `${dateStr} ${startTime}`.trim();
    const endDateTimeStr = `${dateStr} ${endTime}`.trim();

    const startDate = new Date(startDateTimeStr);
    const endDate = new Date(endDateTimeStr);

    const formatComponent = (datePart: number) => datePart.toString().padStart(2, '0');
    const formatYear = (year: number) => year.toString();

    const start = `${formatYear(startDate.getFullYear())}${formatComponent(startDate.getMonth() + 1)}${formatComponent(startDate.getDate())}T${formatComponent(startDate.getHours())}${formatComponent(startDate.getMinutes())}${formatComponent(startDate.getSeconds())}`;
    const end = `${formatYear(endDate.getFullYear())}${formatComponent(endDate.getMonth() + 1)}${formatComponent(endDate.getDate())}T${formatComponent(endDate.getHours())}${formatComponent(endDate.getMinutes())}${formatComponent(endDate.getSeconds())}`;

    return { start, end };

  } catch (error) {
    console.error('Error formatting date for calendar:', error);
    return null;
  }
};

const createGoogleCalendarLink = (event: any): string | null => {
  const dates = formatForCalendar(event.date, event.time);
  if (!dates) return null;

  const baseUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
  const text = encodeURIComponent(event.title);
  const datesParam = `${dates.start}/${dates.end}`;
  const details = encodeURIComponent(event.description);
  const location = encodeURIComponent(event.venue);

  return `${baseUrl}&text=${text}&dates=${datesParam}&details=${details}&location=${location}`;
};

export default function EventDetailsPage({ params }: Props) {
  const { slug } = params;
  const { event: backendEvent, loading, error, refetch } = useEvent(slug);
  const [showFullDescription, setShowFullDescription] = useState(false);

  if (loading) {
    return (
      <section className="py-20">
        <div className="container-custom">
          <div className="flex justify-center items-center min-h-[400px]">
            <LoadingSpinner />
          </div>
        </div>
      </section>
    );
  }

  if (error || !backendEvent) {
    return (
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center">
        <h1 className="text-3xl font-bold mb-6">Event Not Found</h1>
            <p className="text-muted-foreground mb-4">
              {error || `The event with slug "${slug}" could not be found.`}
            </p>
            <div className="space-x-4">
              <Button onClick={refetch} variant="outline">
                Try Again
              </Button>
              <Button asChild>
                <Link href="/media/events">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Events
                </Link>
              </Button>
            </div>
          </div>
      </div>
      </section>
    );
  }

  // Transform the backend event data
  const event = transformEvent(backendEvent);

  const handleAddToCalendar = () => {
    addToCalendar({
      title: event.title,
      description: event.description,
      startTime: event.event_date,
      location: event.venue,
      duration: 120 // Default to 2 hours
    });
  };

  const googleCalendarLink = event.eventStatus === 'upcoming' ? createGoogleCalendarLink(event) : null;

  const truncatedDescription = event.description.length > 300 
    ? event.description.substring(0, 300) + '...'
    : event.description;

  return (
    <section className="py-20">
      <div className="container-custom">
        {/* Back button */}
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/media/events">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Events
            </Link>
          </Button>
        </div>

        {/* Event banner */}
      {event.banner && (
          <div className="relative w-full h-64 mb-8 rounded-lg overflow-hidden">
          <Image
            src={event.banner}
            alt={event.title}
            fill
            className="object-cover"
          />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute top-4 left-4">
              <Badge className={event.type === 'webinar' ? 
                "bg-accent text-white hover:bg-accent/90" : 
                "bg-primary text-white hover:bg-primary/90"
              }>
                {getEventTypeText(event.type)}
              </Badge>
            </div>
            <div className="absolute top-4 right-4">
              <Badge variant="outline" className="bg-background/80 border-border">
                {getRegionText(event.region)}
              </Badge>
            </div>
        </div>
      )}

      {/* Main content */}
        <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
              <div className="mb-6">
          <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
                
                {/* Event status badge */}
                {event.isPast && (
                  <Badge className="mb-4 bg-muted text-foreground border border-border/50">
                    Past Event
                  </Badge>
                )}
                
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-lg text-muted-foreground">
                    {showFullDescription ? event.description : truncatedDescription}
                    {event.description.length > 300 && (
                      <button
                        onClick={() => setShowFullDescription(!showFullDescription)}
                        className="ml-2 text-primary hover:underline inline-flex items-center"
                      >
                        {showFullDescription ? (
                          <>
                            Show less <ChevronUp className="ml-1 h-4 w-4" />
                          </>
                        ) : (
                          <>
                            Show more <ChevronDown className="ml-1 h-4 w-4" />
                          </>
                        )}
                      </button>
                    )}
                  </p>
                </div>
              </div>

              {/* Event details card */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Event Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-accent" />
                    <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-accent" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-accent" />
                <span>{event.venue}</span>
              </div>
              {event.capacity && (
                <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-accent" />
                      <span>
                        {event.registration_count || 0} / {event.capacity} registered
                        {event.availableSpots !== undefined && (
                          <span className="text-muted-foreground ml-1">
                            ({event.availableSpots} available)
                          </span>
                        )}
                      </span>
                </div>
              )}
            </CardContent>
          </Card>

              {/* Agenda section */}
              {event.agenda && event.agenda.length > 0 && (
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Event Agenda</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {event.agenda.map((agendaItem: any, index: number) => (
                        <li key={index} className="flex gap-3">
                          <span className="text-primary font-semibold text-sm">
                            {agendaItem.time || `${index + 1}.`}
                          </span>
                          <div>
                            <p className="font-medium">{agendaItem.item || agendaItem.title || `Agenda Item ${index + 1}`}</p>
                            {agendaItem.description && (
                              <p className="text-sm text-muted-foreground mt-1">{agendaItem.description}</p>
                            )}
                            {agendaItem.speaker && (
                              <p className="text-sm text-muted-foreground">Speaker: {agendaItem.speaker}</p>
                            )}
                            {agendaItem.duration_minutes && (
                              <p className="text-sm text-muted-foreground">Duration: {agendaItem.duration_minutes} minutes</p>
                            )}
                          </div>
                  </li>
                ))}
              </ul>
                  </CardContent>
                </Card>
          )}

              {/* Speakers section */}
          {event.speakers && event.speakers.length > 0 && (
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Event Speakers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-6">
                      {event.speakers.map((speaker: any, index: number) => (
                        <div key={index} className="flex gap-4">
                      {speaker.photo && (
                            <div className="relative w-16 h-16 flex-shrink-0">
                          <Image
                            src={speaker.photo}
                            alt={speaker.name}
                            fill
                            className="rounded-full object-cover"
                          />
                        </div>
                      )}
                          <div>
                            <h3 className="font-semibold">{speaker.name}</h3>
                            <p className="text-sm text-muted-foreground">{speaker.title}</p>
                            {speaker.bio && (
                              <p className="text-sm mt-2">{speaker.bio}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    </CardContent>
                  </Card>
              )}

              {/* Past event materials */}
              {event.isPast && (
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Download className="h-5 w-5" />
                      Event Materials
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      This event has concluded. Materials and recordings may be available below.
                    </p>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full flex items-center gap-2" disabled>
                        <Download className="w-4 h-4" />
                        Presentation Slides (Coming Soon)
                      </Button>
                      <Button variant="outline" className="w-full flex items-center gap-2" disabled>
                        <Video className="w-4 h-4" />
                        Event Recording (Coming Soon)
                      </Button>
              </div>
                  </CardContent>
                </Card>
              )}
        </div>

        {/* Sidebar */}
            <div className="space-y-6">
              {/* Registration/Action Card */}
              <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                    {event.isUpcoming && event.isRegistrationOpen ? (
                      <>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground mb-2">Registration Status</p>
                          <Badge variant={event.registrationStatusType === 'available' ? 'default' : 'outline'}>
                            {event.registrationStatusText}
                          </Badge>
                        </div>
                        <Separator />
                        <div className="space-y-3">
                          <Button className="w-full" size="lg">
                  Register Now
                </Button>
                          {googleCalendarLink && (
                <Button
                  variant="outline"
                  className="w-full"
                              onClick={() => window.open(googleCalendarLink, '_blank')}
                            >
                              Add to Calendar
                            </Button>
                          )}
                        </div>
                      </>
                    ) : event.isUpcoming ? (
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-2">Registration Status</p>
                        <Badge variant="secondary">{event.registrationStatusText}</Badge>
                        {googleCalendarLink && (
                          <Button
                            variant="outline"
                            className="w-full mt-4"
                            onClick={() => window.open(googleCalendarLink, '_blank')}
                >
                  Add to Calendar
                </Button>
                        )}
                      </div>
                    ) : (
                      <div className="text-center">
                        <Badge variant="secondary" className="mb-4">
                          Event Completed
                        </Badge>
                        <p className="text-sm text-muted-foreground">
                          This event has concluded. Check the materials section for recordings and presentations.
                        </p>
                      </div>
                    )}
              </div>
            </CardContent>
          </Card>

              {/* Event countdown for upcoming events */}
              {event.isUpcoming && (
            <Card>
                  <CardHeader>
                    <CardTitle className="text-center">Time Until Event</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <EventCountdown targetDateTime={event.event_date} />
              </CardContent>
            </Card>
          )}

              {/* Quick Info Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Event Type:</span>
                    <span>{getEventTypeText(event.type)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Region:</span>
                    <span>{getRegionText(event.region)}</span>
                  </div>
                  {event.capacity && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Capacity:</span>
                      <span>{event.capacity} attendees</span>
                    </div>
                  )}
                  {event.registration_deadline && event.isUpcoming && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Registration Deadline:</span>
                      <span className="text-right">{new Date(event.registration_deadline).toLocaleDateString()}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Registration form for upcoming events */}
        {event.isUpcoming && event.isRegistrationOpen && (
          <div className="mt-12 max-w-7xl mx-auto">
            <EventRegistrationForm eventSlug={event.slug} />
          </div>
        )}
      </div>
    </section>
  );
}