import { EventType } from "@prisma/client";

import { AdminWrapper } from "~/components";
import styles from "./update.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

export default function EventCreatePage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data: event, isLoading: isEventLoading } = api.event.getById.useQuery(
    { id }
  );

  const [eventName, setEventName] = useState(event?.name ? event.name : "");
  const [date, setDate] = useState(event?.date ? event.date : new Date());
  const [tag, setTag] = useState<EventType>(event?.tag ? event.tag : "WEB");
  const [imagePath, setImagePath] = useState(
    event?.image
      ? event.image
      : "https://developers.google.com/community/gdsc/images/gdsc-social-share.png"
  );
  const [image, setImage] = useState<Blob | null>();

  const [tagLine, setTagLine] = useState<string | undefined>(
    event?.tagLine ? event.tagLine : undefined
  );
  const [description, setDescription] = useState<string | undefined>(
    event?.description ? event.description : undefined
  );

  const { mutateAsync: updateEvent } = api.event.updateEvent.useMutation();

  const update = async () => {
    const res = await updateEvent({
      date,
      tag,
      name: eventName,
      image: imagePath,
      tagLine,
      description,
      id,
    });
    console.log(res);
    router.push("/admin/events");
  };

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => {
        typeof reader.result === "string" && setImagePath(reader.result);
      };
    }
  }, [image]);

  if (!event || isEventLoading) return <AdminWrapper>Loading...</AdminWrapper>;

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

          {/* date */}
          <label className={styles.label} htmlFor="date">
            Date From
          </label>
          <input
            type="date"
            className={styles.input}
            name="date"
            value={`${date.getFullYear()}-${
              date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()
            }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`}
            onChange={(e) => setDate(new Date(e.target.value))}
          />

          {/* time */}
          <label className={styles.label} htmlFor="time">
            Time
          </label>
          <input
            type="time"
            className={styles.input}
            name="time"
            value={`${
              date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
            }:${
              date.getMinutes() < 10
                ? `0${date.getMinutes()}`
                : date.getMinutes()
            }`}
            onChange={(e) => {
              const [hours, min] = e.target.value.split(":");
              date.setHours(parseInt(hours!), parseInt(min!));
              console.log(date);
              setDate(date);
            }}
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
              <option key={eventType} value={eventType}>
                {eventType.toUpperCase()}
              </option>
            ))}
          </select>

          {/* tag line */}
          <label className={styles.label} htmlFor="tagLine">
            Tag Line
          </label>
          <input
            value={tagLine}
            onChange={(e) => setTagLine(e.target.value)}
            type="text"
            className={styles.input}
            name="tagLine"
          />

          {/* description */}
          <label className={styles.label} htmlFor="tagLine">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.input}
            name="tagLine"
          />

          {/* image */}
          <label className={styles.label} htmlFor="dateTill">
            Image
          </label>
          <img className={styles.previewImage} src={imagePath} />
          <input
            type="file"
            accept="image/*"
            className={styles.input}
            name="dateTill"
            onChange={(e) => setImage(e.target.files?.item(0))}
          />
          <p className={styles.label}>{image ? image.name : " "}</p>

          {/* buttons */}
          <div className={styles.btnSection}>
            <Link href="/admin/events">
              <button className={styles.secondaryBtn}>Go Back</button>
            </Link>
            <button
              disabled={eventName.length === 0}
              onClick={update}
              className={styles.btn}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </AdminWrapper>
  );
}
