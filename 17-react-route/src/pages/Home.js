import { Link, useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  function navigateHandler() {
    navigate("/products");
  }
  return (
    <>
      <h1>My home page</h1>
      <p>
        Go to the <Link to="/products">list of products</Link>
      </p>
      <p>
        <button onClick={navigateHandler}>Naviagte</button>
      </p>
    </>
  );
}

export default HomePage;
