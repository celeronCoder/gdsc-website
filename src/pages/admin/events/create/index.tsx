import { EventType } from "@prisma/client";

import { AdminWrapper } from "~/components";
import styles from "./create.module.css";
import Link from "next/link";
import { useState } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

export default function EventCreatePage() {
  const [eventName, setEventName] = useState("");
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTill, setDateTill] = useState(new Date());
  const [tag, setTag] = useState<EventType>("WEB");

  const { mutateAsync: createEvent } = api.event.create.useMutation();
  const router = useRouter();

  const create = async () => {
    const res = await createEvent({ dateFrom, dateTill, tag, name: eventName });
    console.log(res);
    router.push("/admin/events");
  };

  return (
    <AdminWrapper>
      <div className={styles.main}>
        <div className={styles.card}>
          <h3>Add an Event</h3>
          <hr className={styles.divider} />

          {/* event name */}
          <label className={styles.label} htmlFor="eventName">
            Event Name
          </label>
          <input
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            type="text"
            className={styles.input}
            name="eventName"
          />

          {/* date from */}
          <label className={styles.label} htmlFor="dateFrom">
            Date From
          </label>
          <input
            type="date"
            className={styles.input}
            name="dateFrom"
            onChange={(e) => setDateFrom(new Date(e.target.value))}
          />

          {/* date till */}
          <label className={styles.label} htmlFor="dateTill">
            Date Till
          </label>
          <input
            type="date"
            className={styles.input}
            name="dateTill"
            onChange={(e) => setDateTill(new Date(e.target.value))}
          />

          {/* tag */}
          <label className={styles.label} htmlFor="tag">
            Tag
          </label>
          <select
            name="tag"
            className={styles.select}
            value={tag}
            onChange={(e) => setTag(e.target.value as EventType)}
          >
            {Object.values(EventType).map((eventType) => (
              <option value={eventType}>{eventType.toUpperCase()}</option>
            ))}
          </select>

          {/* buttons */}
          <div className={styles.btnSection}>
            <Link href="/admin/events">
              <button className={styles.secondaryBtn}>Go Back</button>
            </Link>
            <button
              disabled={eventName.length === 0}
              onClick={create}
              className={styles.btn}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </AdminWrapper>
  );
}
