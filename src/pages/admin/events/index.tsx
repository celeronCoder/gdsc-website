import { AdminWrapper } from "~/components";
import { api } from "~/utils/api";
import styles from "./events.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

export default function EventsPage() {
  const { data: events, isLoading } = api.event.getAll.useQuery();
  const router = useRouter();

  return (
    <AdminWrapper>
      <div className={styles.headingContainer}>
        <h2 className={styles.noMargin}>Events</h2>
        <button
          onClick={() => router.push("/admin/events/create")}
          className={styles.createBtn}
        >
          Add Event
        </button>
      </div>
      {!events || isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.grid}>
          {events.length === 0 &&
            "There are no events right now please create..."}

          {events.map((event) => (
            <div
              onClick={() => router.push(`/admin/events/${event.id}`)}
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
                <h3 className={styles.noMargin}>{event.name}</h3>
                <p className={`${styles.tag} ${styles.noMargin}`}>
                  {event.tag}
                </p>

                <p className={`${styles.secondaryText} ${styles.noMargin}`}>
                  {event.tagLine}
                </p>

                <p className={`${styles.secondaryText} ${styles.noMargin}`}>
                  {event.date.toLocaleDateString()} at{" "}
                  {event.date.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminWrapper>
  );
}
