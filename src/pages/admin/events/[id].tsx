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
            <div className={styles.container}>
              <h2 className={styles.noMargin}>{event.name}</h2>
              <p className={`${styles.secondaryText} ${styles.noMargin}`}>
                {event.tagLine}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <p className={`${styles.tag} ${styles.noMargin}`}>
                  {event.tag}
                </p>
                <p className={`${styles.tag} ${styles.noMargin}`}>
                  {event.venueType}
                </p>
              </div>
            </div>

            <p>
              {!event.description || event.description?.length === 0
                ? "No Description"
                : event.description}
            </p>
            <p className={styles.secondaryText}>
              {event.date.toLocaleString()}
            </p>
            <p className={styles.secondaryText}>{event.venue}</p>
          </div>
        </div>
      )}
    </AdminWrapper>
  );
}
