import { createSlice } from "@reduxjs/toolkit";
const initialCounterState = { counter: 0, showCounter: true };

/**
 * createSilice를 이용하면
 * 기존에 reducer함수에서 기존 상태를 바꾸지 않기위해 새로 객체를 생성해서 업데이트 하던것을
 * 할 필요가 없다.
 * createSlice에서 기존 상태를 바꿀 수 없게 구현되어있다.
 */
const counterSlice = createSlice({
  name: "counter",
  initialState: initialCounterState,
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter = state.counter + action.payload.value;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

export default counterSlice.reducer;
export const counterActions = counterSlice.actions;
