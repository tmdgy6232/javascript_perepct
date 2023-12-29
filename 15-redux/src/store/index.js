import { configureStore } from "@reduxjs/toolkit";
import counterSliceReducer from "./counter";
import authSliceReducer from "./auth";
// const counterReducer = (state = initialState, action) => {
//   if (action.type === "increment") {
//     return {
//       ...state,
//       counter: state.counter + 1,
//     };
//   }

//   if (action.type === "increase") {
//     return {
//       ...state,
//       counter: state.counter + action.value,
//     };
//   }

//   if (action.type === "decrement") {
//     return {
//       ...state,
//       counter: state.counter - 1,
//     };
//   }
//   if (action.type === "toggle") {
//     return {
//       ...state,
//       showCounter: !state.showCounter,
//     };
//   }

//   return state;
// };

//const store = createStore(counterSlice.reducer);

// configureStore안에 리듀서를 객체로 생성해서 key:value 형태로 전달하면 전달한 리듀서들을 병합해서 큰 리듀서로 만들어 전달한다.

const store = configureStore({
  reducer: { counter: counterSliceReducer, auth: authSliceReducer },
});
export default store;
