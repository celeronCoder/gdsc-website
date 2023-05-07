import { useState } from "react";
import Image from "next/image";
import EventCard from "./Event-Card";
import { Event } from "@prisma/client";

const EventBox: React.FC<{ event: Event }> = ({ event }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="event--box" onClick={() => setIsOpen(true)}>
        <div>
          <Image
            src={event.image ? event.image : ""}
            width={10}
            height={10}
            alt="event-poster"
          ></Image>
        </div>
        <h3>{event.name}</h3>
        {event.description && (
          <p>
            {event.description?.slice(0, 100)}
            {event.description?.length > 100 && "..."}
          </p>
        )}
      </div>
      {isOpen && <EventCard event={event} setIsOpen={setIsOpen} />}
    </>
  );
};

export default EventBox;
