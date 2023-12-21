import React, { useState, useEffect } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log(isLoggedIn);
  /**
   * useEffect 훅은
   * 두번째 인자에 넣은 의존성
을 트리거로 실행된다.
   * 아무것도 넣지 않았을때 최초 한번만 실행된다
   * useState로 햇을 경우 아래 코드는 무한루프에 갇히지만
   * useEffect를 사용했을 경우 최초 한번만 실행하기에 무한루프에 갇히지 않는다.
   */
  useEffect(() => {
    const storedUserLoggedInInfomation = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInInfomation === "1") {
      setIsLoggedIn(true);
    }
  }, []);
  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;
