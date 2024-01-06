import { useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";

function EventsPage() {
  const fetchedEvents = useLoaderData();
  // if (fetchedEvents.isError) {
  //   return <p>{fetchedEvents.message}</p>;
  // }
  return <EventsList events={fetchedEvents} />;
}

export default EventsPage;

export async function loader() {
  const response = await fetch("http://localhost:8080/events111");

  if (!response.ok) {
    // ...
    // return {
    //   isError: true,
    //   message: "Could not fetch events.",
    // };
    throw new Response(JSON.stringify({ message: "Could not fetch events" }), {
      status: 500,
    });
  } else {
    // useLoaderData는 fetch가 Promise<Response> 타입을 리턴하기때문에
    // 그에맞게 Response 객체 자체를 전달해도 안에 데이터를 추출해서 전달해준다.
    // 그러므로 추출 작업 안하고 response 자체를 리턴해도 작동한다.

    // 추가적으로 loader 함수는 Server side가 아닌 client side 즉 브라우저에서 실행된다.
    // 그러므로 로컬스토리지, 쿠키 등에 접근도 가능하다.
    // 리액트 훅은 사용할 수 없다. 컴포넌트가 아니기때문 ㅎ

    // return resp[onse
    const resData = await response.json();
    return resData.events;
  }
}
