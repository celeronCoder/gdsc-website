import { Event, EventType } from "@prisma/client";
import { useEffect, useState } from "react";

const FilterDiv: React.FC<{
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  allEvents: Event[];
}> = ({ setEvents, allEvents }) => {
  const [searchString, setSearchString] = useState("");
  const [selectedTag, setSelectedTag] = useState<EventType | "All">("All");

  useEffect(() => {
    setSelectedTag("All");
    if (searchString !== "")
      setEvents(
        allEvents.filter((event) =>
          event.name.toLowerCase().includes(searchString.toLowerCase())
        )
      );
    else setEvents(allEvents);
  }, [searchString]);

  useEffect(() => {
    if (selectedTag === "All") setEvents(allEvents);
    else setEvents(allEvents.filter((event) => event.tag === selectedTag));
  }, [selectedTag]);

  return (
    <div className="filter--div">
      <h3>Browse Events</h3>
      <div className="div--box">
        <div className="filter--box">
          <i className="fa fa-filter icon"></i>
          <select
            size={1}
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.currentTarget.value as EventType)}
          >
            <option value={"All"}>All</option>
            {Object.values(EventType).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="search--box">
          <input
            type={"text"}
            placeholder={"Search"}
            size={10}
            value={searchString}
            onChange={(e) => setSearchString(e.currentTarget.value)}
          />
          <i className="fa fa-search icon"></i>
        </div>
      </div>
    </div>
  );
};

export default FilterDiv;
