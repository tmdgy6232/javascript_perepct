import React, { useState, useCallback } from "react";

import "./App.css";
import Button from "./components/UI/Button/Button";
import DemoOutput from "./components/Demo/DemoOutput";
function App() {
  const [showParagraph, setShowParagraph] = useState(false);
  const [allowToggle, setAllowToggle] = useState(false);

  console.log("APP RUNNING");
  /**
   * useCallback 두번째 인자에 빈 배열만 넣으면
   * 자바스크립트 함수는 클로저이기 때문에
   * allowToggle이 최초값으로 만들어지게 되고,
   * allowTogglehandler를 실행 후
   * toglleParagraphHandler를 실행해도
   * toglleParagraphHandler에 사용되는 allowToggle의 값은 처음 지정된 false이기 때문에
   * 아무것도 실행되지 않는다.
   *
   * 그러므로 두번째 인자에 값을 넣어줘야 한다.
   * 이것이 React, useCallback의 동작원리다. 클로저를 잘 이해하자.
   */
  const toggleParagraphHandler = useCallback(() => {
    if (allowToggle) {
      setShowParagraph((prev) => {
        return !prev;
      });
    }
  }, [allowToggle]);

  const allowToggleHandler = () => {
    setAllowToggle(true);
  };
  return (
    <div className="app">
      <h1>Hi there!</h1>
      <DemoOutput show={showParagraph} />
      <Button onClick={allowToggleHandler}>Allow toggling Paragraph!</Button>
      <Button onClick={toggleParagraphHandler}>Toggle Paragraph!</Button>
    </div>
  );
}
/**
 * App.js가 재실행 될때마다 함수를 만들고, 함수는 주소값이 계속 바뀌므로 Button을 React.memo로 감싸 최적화를 하더라도 props가
 * 변화했다고 인지하기 때문에 Button Component는 재평가된다.
 */
export default App;
