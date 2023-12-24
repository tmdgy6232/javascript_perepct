import React, { useContext } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./store/auth-context";

function App() {
  /**
   * useEffect 훅은
   * 두번째 인자에 넣은 의존성
을 트리거로 실행된다.
   * 아무것도 넣지 않았을때 최초 한번만 실행된다
   * useState로 햇을 경우 아래 코드는 무한루프에 갇히지만
   * useEffect를 사용했을 경우 최초 한번만 실행하기에 무한루프에 갇히지 않는다.
   */
  const ctx = useContext(AuthContext);
  return (
    <React.Fragment>
      <MainHeader />
      <main>
        {!ctx.isLoggedIn && <Login />}
        {ctx.isLoggedIn && <Home />}
      </main>
    </React.Fragment>
  );
}

export default App;
