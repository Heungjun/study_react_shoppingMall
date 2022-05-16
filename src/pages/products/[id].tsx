import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetcher, QueryKeys } from "../../queryClient";
import { Product } from "../../types";
import ProductDetail from "./detail";

const ProductDetailPage = () => {
  const { id } = useParams();

  const { data } = useQuery<Product>([QueryKeys.PRODUCTS, id], () =>
    fetcher({
      method: "GET",
      path: `/products/${id}`,
    })
  );

  if (!data) return null;

  return (
    <>
      <h2>상품상세</h2>
      <ProductDetail item={data} />
    </>
  );
};

export default ProductDetailPage;
