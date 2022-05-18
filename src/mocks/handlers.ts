import { graphql } from "msw";
import { v4 as uuid } from "uuid";
import GET_PRODUCTS, { GET_PRODUCT, Product } from "../graphql/products";

const mock_products = Array.from({ length: 20 }).map((_, i) => ({
  id: uuid(),
  imageUrl: `https://placeimg.com/200/150/${i + 1}`,
  price: 50000,
  title: `임시상품${i + 1}`,
  description: `임시상세내용${i + 1}`,
  createdAt: new Date(1634567890123 + (i + 1000 * 60 * 60 * 10)).toString(),
}));

export const handlers = [
  graphql.query(GET_PRODUCTS, (req, res, context) => {
    return res(
      context.data({
        products: mock_products,
      })
    );
  }),

  graphql.query(GET_PRODUCT, (req, res, context) => {
    // let returnRow: Product | undefined = mock_products.find(
    //   (row) => row.id === req.id
    // );
    // console.log(
    //   "req",
    //   returnRow,
    //   req.id,
    //   mock_products.map((row) => row)
    // );
    // return res(context.data(returnRow!));
    return res(context.data(mock_products[0]));
    // return res(context.data(mock_products.find((row) => row.id === req.id)));
  }),
];
