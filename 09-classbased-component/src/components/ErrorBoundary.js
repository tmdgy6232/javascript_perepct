import { Component } from "react";

class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = { hasError: false };
  }

  // 오류경계 (ERROR boundary)는 coumponetDidCatch를
  // 사용하는 컴포넌트들을 말한다.
  componentDidCatch(error) {
    console.log(error);
    this.setState({ hasError: true });
  }
  render() {
    if (this.state.hasError) {
      return <p>Someting weng wrong!</p>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
