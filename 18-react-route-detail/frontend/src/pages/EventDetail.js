import { useParams } from "react-router-dom";
function EventDetailPage() {
  const { id } = useParams();
  return (
    <>
      <h1>EventDetailPage</h1>
      <p>{id}</p>
    </>
  );
}
export default EventDetailPage;
