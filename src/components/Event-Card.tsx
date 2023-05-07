import { Event } from "@prisma/client";

const EventCard: React.FC<{
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  event: Event;
}> = ({ setIsOpen, event }) => {
  return (
    <div className="modalbg" onClick={() => setIsOpen(false)}>
      <div className="centered">
        <div className="modal event--modal">
          <div className="close--btn">
            <button className="light--mode" onClick={() => setIsOpen(false)}>
              <img src="https://img.icons8.com/sf-black/64/null/multiply.png" />
            </button>
            <button className="dark--mode" onClick={() => setIsOpen(false)}>
              <img src="https://img.icons8.com/sf-black/64/ffffff/multiply.png" />
            </button>
          </div>

          <div className="event--info">
            <div className="poster">
              <img src={event.image!} alt="event-poster" />
            </div>
            <div className="info">
              <h3>{event.name}</h3>
              <p>{event.tagLine}</p>
              <p>
                Schedule:{" "}
                {event.date.toLocaleString("EN-IN", {
                  timeStyle: "short",
                  dateStyle: "full",
                })}
              </p>
              <p>Venue: online</p>
              <p>Organizer Team: {event.tag}</p>
            </div>
          </div>

          <div className="event--details">
            <p>{event.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
