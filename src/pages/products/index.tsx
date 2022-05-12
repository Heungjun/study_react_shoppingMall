import { useQuery } from "react-query";
import ProductItem from "../../components/product/item";
import { fetcher, QueryKeys } from "../../queryClient";
import { Product } from "../../types";

const ProductList = () => {
  const { data } = useQuery<Product[]>(QueryKeys.PRODUCTS, () =>
    fetcher({
      method: "GET",
      path: "/products",
    })
  );

  console.log(data);

  return (
    <div>
      <ul>
        {data?.map((product) => (
          <ProductItem {...product} key={product.id} />
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
