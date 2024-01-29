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
    staleTime: 5000, // 캐시데이터를 사용하지만 자체적으로 데이터가 업데이트 되었는지 확인하기 위해 쿼리를 재실행할 시간
    // gcTime: 30000, // 데이터와 캐시를 얼마나 오래 보관할지 정함 default 5분
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
