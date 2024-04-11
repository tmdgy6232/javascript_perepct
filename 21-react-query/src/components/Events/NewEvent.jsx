import { Link, useNavigate } from "react-router-dom";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { useMutation } from "@tanstack/react-query"; // useQuery는 데이터를 가져올때만 사용한다.
import { createNewEvent } from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import { queryClient } from "../../util/http.js";
export default function NewEvent() {
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: "mutation", // 이건 반드시 필요하지 않음. useQuery의 경우 데이터를 가져오는 거라 캐싱이 필요했지만, update, post의 경우엔 캐싱이 필요하지 않음.
    mutationFn: createNewEvent,
    onSuccess: () => {
      // 요청 성공했을 경우에 실행될 함수
      navigate("/events");
      // 쿼리키가 무조건 모두 같지 않아도 됨. events가 '포함된' 쿼리들이 다 포함되기 때문임 exact 속성을 true로 하면 정확히 일치하는 쿼리만 무효화됨ㅎ
      queryClient.invalidateQueries({ queryKey: ["events"] }); // 지금화면에 리액트 쿼리로 생성된 데이터들이 다 오래됐다고 refetch가 필요하다고 알려주는 함수
    },
  });
  function handleSubmit(formData) {
    mutate({
      event: formData,
    });

    //navigate("/events");
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
