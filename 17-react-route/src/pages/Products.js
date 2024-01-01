import { Link } from "react-router-dom";
const PRODUCTS = [
  {
    id: "p1",
    title: "Product1",
  },
  {
    id: "p2",
    title: "Product2",
  },
  {
    id: "p3",
    title: "Product3",
  },
];
function ProductPage() {
  return (
    <>
      <h1>Product Page</h1>
      <ul>
        {PRODUCTS.map((item) => (
          <li key={item.id}>
            <Link to={`/products/${item.id}`}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ProductPage;
