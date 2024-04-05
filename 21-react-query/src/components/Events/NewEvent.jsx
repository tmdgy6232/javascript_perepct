import { Link, useNavigate } from "react-router-dom";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { useMutation } from "@tanstack/react-query"; // useQuery는 데이터를 가져올때만 사용한다.
import { createNewEvent } from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";
export default function NewEvent() {
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: "mutation", // 이건 반드시 필요하지 않음. useQuery의 경우 데이터를 가져오는 거라 캐싱이 필요했지만, update, post의 경우엔 캐싱이 필요하지 않음.
    mutationFn: createNewEvent,
  });
  function handleSubmit(formData) {
    mutate({
      event: formData,
    });
  }

  return (
    <Modal onClose={() => navigate("../")}>
      <EventForm onSubmit={handleSubmit}>
        {isPending && " Submitting..."}
        {!isPending && (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Create
            </button>
          </>
        )}
      </EventForm>
      {isError && (
        <ErrorBlock
          title="Failed to create event"
          message={
            error.info?.message ||
            "Failed to create event. please check your inputs and try again later."
          }
        />
      )}
    </Modal>
  );
}
