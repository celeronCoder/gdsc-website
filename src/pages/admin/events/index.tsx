import { AdminWrapper } from "~/components";
import { api } from "~/utils/api";
import styles from "./events.module.css";
import Link from "next/link";

export default function EventsPage() {
  const { data: events, isLoading } = api.event.getAll.useQuery();

  return (
    <AdminWrapper>
      <div className={styles.headingContainer}>
        <h2>Events</h2>
        <Link href="/admin/events/create" className={styles.createBtn}>
          Add Event
        </Link>
      </div>
      {!events || isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.grid}>
          {events.length === 0 &&
            "There are no events right now please create..."}

          {events.map((event) => (
            <Link
              href={`/admin/events/${event.id}`}
              className={styles.card}
              key={event.id}
            >
              <img
                className={styles.image}
                src={
                  event.image
                    ? event.image
                    : "https://developers.google.com/community/gdsc/images/gdsc-social-share.png"
                }
              />
              <div className={styles.cardContent}>
                <h3>{event.name}</h3>
                <p className={styles.tag}>{event.tag}</p>

                <p className={styles.secondaryText}>{event.tagLine}</p>

                <p className={styles.secondaryText}>
                  {event.date.toLocaleDateString()} at{" "}
                  {event.date.toLocaleTimeString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </AdminWrapper>
  );
}
