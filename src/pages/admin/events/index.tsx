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
        <div>
          {events.length === 0 &&
            "There are no events right now please create..."}

          {events.map((event) => (
            <div>{event.name}</div>
          ))}
        </div>
      )}
    </AdminWrapper>
  );
}
