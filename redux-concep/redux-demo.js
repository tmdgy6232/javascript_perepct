const redux = require("redux");

//리듀서 함수 생성
const counterReducer = (state = { counter: 0 }, action) => {
  if (action.type === "increment") {
    return {
      counter: state.counter + 1,
    };
  }

  if (action.type === "decrement") {
    return {
      counter: state.counter - 1,
    };
  }
  return state;
};
// 스토어 생성
const store = redux.createStore(counterReducer);

// 구독 함수 생성
const counterSubscriber = () => {
  const latestState = store.getState();
  console.log(latestState);
};

//구독함수 등록
store.subscribe(counterSubscriber);

// 액션 등록, 타입은 유니크해야함
store.dispatch({ type: "increment" });
store.dispatch({ type: "decrement" });
