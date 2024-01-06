import { useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";

function EventsPage() {
  const fetchedEvents = useLoaderData();
  return <EventsList events={fetchedEvents} />;
}

export default EventsPage;

export async function loader() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // ...
  } else {
    // useLoaderData는 fetch가 Promise<Response> 타입을 리턴하기때문에
    // 그에맞게 Response 객체 자체를 전달해도 안에 데이터를 추출해서 전달해준다.
    // 그러므로 추출 작업 안하고 response 자체를 리턴해도 작동한다.
    const resData = await response.json();
    return resData.events;
  }
}
