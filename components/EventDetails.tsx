import { notFound } from "next/navigation";
import Image from "next/image";
import BookEvent from "@/components/BookEvent";
import { getSimilarEventsBySlug } from "@/lib/actions/event.actions";
import { IEvent } from "@/database/event.model";
import EventCard from "@/components/EventCard";
import { cacheLife } from "next/cache";

const EventDetailItem = ({ icon, alt, label }: any) => {
    return (
        <div className="flex-row-gap-2 items-center">
            <Image src={icon} alt={alt} width={17} height={17} />
            <span>{label}</span>
        </div>
    );
};

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => {
    return (
        <div className="flex-col-gap-2">
            <h2>Agenda</h2>
            <ul>
                {agendaItems.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

const EventTags = ({ tags }: { tags: string[] }) => {
    return (
        <div className="flex flex-row gap-1.5 flex-wrap">
            {tags.map((tag, index) => (
                <div key={index} className="pill">{tag}</div>
            ))}
        </div>
    );
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetails = async ({ params }: { params: Promise<{ slug: string }> }) => {
    'use cache';
    cacheLife('hours');

    const slug = await params;
    const request = await fetch(`${BASE_URL}/api/events/${slug}`);
    const { event: { _id, title, description, overview, date, time, location, mode, agenda, audience, tags, image, organizer } } = await request.json();

    if (!title) { return notFound(); }

    const booking = 10;

    const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug.slug);

    return (
        <section id="event">
            <div className="header">
                <h1>{title}</h1>
                <p>{description}</p>
            </div>

            <div className="details">

                <div className="content">
                    <Image src={image} alt="Event Banner" width={800} height={800} className="banner" />

                    <section className="flex-col-gap-2">
                        <h2>Overview</h2>
                        <p>{overview}</p>
                    </section>

                    <section className="flex-col-gap-2">
                        <h2>Details</h2>
                        <ul className="flex-col-gap-1">
                            <EventDetailItem icon="/icons/calendar.svg" alt="Calendar" label={date} />
                            <EventDetailItem icon="/icons/clock.svg" alt="Time" label={time} />
                            <EventDetailItem icon="/icons/pin.svg" alt="Location" label={location} />
                            <EventDetailItem icon="/icons/mode.svg" alt="Mode" label={mode} />
                            <EventDetailItem icon="/icons/audience.svg" alt="Audience" label={audience} />
                        </ul>
                    </section>

                    <EventAgenda agendaItems={agenda} />

                    <section className="flex-col-gap-2">
                        <h2>About the Organizer</h2>
                        <p>{organizer}</p>
                    </section>

                    <EventTags tags={tags} />

                </div>

                <aside className="booking">
                    <div className="signup-card">
                        <h2>Book Your Spot</h2>
                        {booking > 0 ? (
                            <p className="text-sm">
                                Join {booking} people who have already booked their spot!
                            </p>) : (
                            <p className="text-sm">
                                Be the first to book your spot!
                            </p>)}

                        <BookEvent eventId={_id} slug={slug.slug} />
                    </div>
                </aside>
            </div>


            <div className="flex w-full flex-col gap-4 pt-40">
                <h2>Similar Events</h2>
                <div className="events">
                    {similarEvents.length > 0 ? (
                        similarEvents.map((similarEvent: IEvent) => (
                            <EventCard key={similarEvent.title} {...similarEvent} />
                        ))
                    ) : (
                        <p>No similar events found.</p>
                    )}
                </div>
            </div>
        </section >
    );
}

export default EventDetails;