import EventCard from "@/components/EventCard"
import ExploreBtn from "@/components/ui/ExploreBtn"
import { IEvent } from "@/database";
import { cacheLife } from "next/cache";
import { events } from "@/lib/constants";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

const Page = async () => {

  'use cache';
  cacheLife('hours');

  //const res = await fetch(`${BASE_URL}/api/events`);
  //const { events } = await res.json();

  return (
    <section>
      <h1 className="text-center">The Hub for every Dev <br /> Event You can't Miss</h1>
      <p className="text-center mt-5">Hackathons, Meetups, ant Conferences, All in One Place</p>

      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>

        <ul className="events">
          {events && events.length > 0 && events.map((event: IEvent) => (
            <li key={event.title} className="list-none" ><EventCard {...event} /></li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Page