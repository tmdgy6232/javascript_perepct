import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
/**
 * ReactRout에서 props.children 같이 하위 라우터들을 내보내 주는게 Outlet 컴포넌트이다.
 */
function RootLayout(props) {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}
export default RootLayout;
