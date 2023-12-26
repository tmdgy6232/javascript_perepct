import React, { useState, useCallback } from "react";

import "./App.css";
import Button from "./components/UI/Button/Button";
import DemoOutput from "./components/Demo/DemoOutput";
function App() {
  const [showParagraph, setShowParagraph] = useState(false);

  console.log("APP RUNNING");
  const toggleParagraphHandler = useCallback(() => {
    setShowParagraph((prev) => {
      return !prev;
    });
  }, []);
  return (
    <div className="app">
      <h1>Hi there!</h1>
      <DemoOutput show={false} />
      <Button onClick={toggleParagraphHandler}>Toggle Paragraph!</Button>
    </div>
  );
}
/**
 * App.js가 재실행 될때마다 함수를 만들고, 함수는 주소값이 계속 바뀌므로 Button을 React.memo로 감싸 최적화를 하더라도 props가
 * 변화했다고 인지하기 때문에 Button Component는 재평가된다.
 */
export default App;
