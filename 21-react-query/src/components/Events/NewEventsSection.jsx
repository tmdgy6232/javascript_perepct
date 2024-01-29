import { useQuery } from "@tanstack/react-query";

import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import EventItem from "./EventItem.jsx";
import { fetchEvents } from "../../util/http.js";
/**
 * Tanstack useQuery를 사용하면
 * 다른화면으로 갔다가 해당 화면으로 포커스 이동 시에 자동으로 queryFn의 함수를 재실행해준다.
 * 컴포넌트가 재평가 된다는 이야기이다.
 *
 */
export default function NewEventsSection() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });
  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={error.info?.message || "Failed to fetch Events."}
      />
    );
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}
