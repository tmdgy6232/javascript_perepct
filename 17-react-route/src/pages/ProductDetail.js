import { useParams, Link } from "react-router-dom";
function ProductDetailPage() {
  const params = useParams();
  const data = params.productId;
  /**
   * relative는 패스를 기준으로 할지 라우트를 기준으로 할지 정해준다.
   * ..는 상위 한단계 올라가는 개념이므로
   * 라우트 기준으로 하면 홈페이지로 가고, 패스 기준으로 가면 패스만 한단계 올려준다.
   */
  return (
    <>
      <h1>Product Details!</h1>
      <p>{params.productId}</p>
      <a>
        <Link to=".." relative="path">
          back!
        </Link>
      </a>
    </>
  );
}

export default ProductDetailPage;
