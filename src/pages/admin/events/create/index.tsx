import { AdminWrapper } from "~/components";
import styles from "./create.module.css";

export default function EventCreatePage() {
  return (
    <AdminWrapper>
      <div className={styles.main}>
        <div className={styles.card}>
          <h3>Create Event</h3>
          <hr className={styles.divider} />

          {/* event name */}
          <label className={styles.label} htmlFor="eventName">
            Event Name
          </label>
          <input type="text" className={styles.input} name="eventName" />

          {/* date from */}
          <label className={styles.label} htmlFor="eventName">
            Date From
          </label>
          <input type="date" className={styles.input} name="eventName" />

          {/* date till */}
          <label className={styles.label} htmlFor="eventName">
            Date Till
          </label>
          <input type="date" className={styles.input} name="eventName" />

          {/* tag */}
        </div>
      </div>
    </AdminWrapper>
  );
}
