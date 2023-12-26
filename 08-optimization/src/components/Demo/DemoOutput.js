import React from "react";
import MyParagraph from "./MyParagraph";

const DemoOutput = (props) => {
  console.log("demooutput running");
  return <MyParagraph>{props.show ? "This is new!" : ""}</MyParagraph>;
};

/**
 * React.memo 함수는 component에 전달하는 Props를 기억해뒀따가
 * props가 변경되었을 경우에만 재실행 및 재평가 한다.
 */
export default React.memo(DemoOutput);
