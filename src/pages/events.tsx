import EventBox from "~/components/Event-Box";
import FilterDiv from "~/components/FilterBox";
import Footer from "~/components/Footer";
import Image from "next/image";
import { Wrapper } from "~/components";
import { api } from "~/utils/api";
import { useEffect, useState } from "react";
import { Event } from "@prisma/client";

export default function Events() {
  const { data } = api.event.getAll.useQuery();
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (data) {
      setAllEvents(data);
      setEvents(data);
    }
  }, [data]);

  return (
    <Wrapper title="Events">
      <Image
        className="bg--img light--mode"
        src={"/images/eventbg.jpg"}
        width={2000}
        height={2000}
        alt="background"
      ></Image>
      <Image
        className="bg--img dark--mode"
        src={"/images/eventbg-dark.jpg"}
        width={2000}
        height={2000}
        alt="background"
      ></Image>
      <span className="page--info">
        <h1 className="page--h1">Events</h1>
        <p>
          Welcome to our club&#39;s events, where innovation meets community.
          Our events are not just about learning and networking, but also about
          fostering a culture of growth and collaboration. We believe that by
          sharing knowledge and experiences, we can all grow together and create
          a better future. So join us, as we explore the latest trends, exchange
          ideas, and work towards building a more inclusive and sustainable
          world.
        </p>
      </span>
      <FilterDiv setEvents={setEvents} allEvents={allEvents} />
      <div className="events--holder">
        {events.length === 0
          ? "Loading..."
          : events.map((event) => <EventBox key={event.id} event={event} />)}
      </div>
      <Footer />
    </Wrapper>
  );
}
