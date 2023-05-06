import { useRouter } from "next/router";
import { AdminWrapper } from "~/components";
import { api } from "~/utils/api";

import styles from "./[id].module.css";

export default function EventDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { data: event, isLoading } = api.event.getById.useQuery({
    id: id as string,
  });

  return (
    <AdminWrapper>
      {isLoading || !event ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.main}>
          <div className={styles.content}>
            <div className={styles.btnContainer}>
              <button
                onClick={() => router.back()}
                className={styles.goBackBtn}
              >
                Go Back
              </button>
              <button
                onClick={() => router.push(`/admin/events/update/${id}`)}
                className={styles.updateBtn}
              >
                Update
              </button>
            </div>
            <img src={event.image!} className={styles.image} />
            <div>
              <h2>{event.name}</h2>
              <p className={styles.secondaryText}>{event.tagLine}</p>
              <p className={styles.tag}>{event.tag}</p>
            </div>

            <p>
              {!event.description || event.description?.length === 0
                ? "No Description"
                : event.description}
            </p>
            <p className={styles.secondaryText}>
              {event.date.toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </AdminWrapper>
  );
}
