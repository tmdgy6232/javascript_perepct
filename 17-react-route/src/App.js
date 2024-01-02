import {
  createBrowserRouter,
  RouterProvider,
  //createRoutesFromElements,
  // Route,
} from "react-router-dom";
import HomePage from "./pages/Home";
import ProductPage from "./pages/Products";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import ProductDetailPage from "./pages/ProductDetail";

// const routeDefinitions = createRoutesFromElements(
//   <Route>
//     <Route path="/" element={<HomePage />} />
//     <Route path="/products" element={<ProductPage />} />
//   </Route>
// );

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> }, // path / 를 안하고 빈값을 설정하지 않아도 인덱스 라우트를 설정하면 부모 라우트가 활성화 되었을 때 자동으로 제일 먼저 실행된다.
      { path: "/products", element: <ProductPage /> },
      { path: "/products/:productId", element: <ProductDetailPage /> },
    ],
    errorElement: <ErrorPage />,
  },
]);

//const router = createBrowserRouter(routeDefinitions);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
