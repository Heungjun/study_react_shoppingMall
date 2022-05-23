import { graphql } from "msw";
import { v4 as uuid } from "uuid";
import { ADD_CART, CartType, GET_CART, UPDATE_CART } from "../graphql/cart";
import GET_PRODUCTS, { GET_PRODUCT } from "../graphql/products";

const mock_products = Array.from({ length: 20 }).map((_, i) => ({
  // id: uuid(),
  id: i + 1 + "",
  imageUrl: `https://placeimg.com/200/150/${i + 1}`,
  price: 50000,
  title: `임시상품${i + 1}`,
  description: `임시상세내용${i + 1}`,
  createdAt: new Date(1634567890123 + (i + 1000 * 60 * 60 * 10)).toString(),
}));

let cartData: { [key: string]: CartType } = {};

export const handlers = [
  graphql.query(GET_PRODUCTS, (req, res, context) => {
    return res(
      context.data({
        products: mock_products,
      })
    );
  }),

  graphql.query(GET_PRODUCT, (req, res, context) => {
    const found = mock_products.find((item) => item.id === req.variables.id);
    if (found) return res(context.data(found));
    return res();
    // return res(context.data(mock_products.find((row) => row.id === req.id)));
  }),

  graphql.query(GET_CART, (req, res, context) => {
    return res(context.data(cartData));
  }),

  graphql.mutation(ADD_CART, (req, res, context) => {
    const newData = { ...cartData };
    const id = req.variables.id;
    if (newData[id]) {
      newData[id] = {
        ...newData[id],
        amount: (newData[id].amount || 0) + 1,
      };
    } else {
      const found = mock_products.find((item) => item.id === req.variables.id);
      if (found) {
        newData[id] = {
          ...found,
          amount: 1,
        };
      }
    }
    cartData = newData;
    return res(context.data(newData));
  }),

  graphql.mutation(UPDATE_CART, (req, res, context) => {
    const newData = { ...cartData };
    const { id, amount } = req.variables;
    if (!newData[id]) {
      throw new Error("없는 데이터 입니다.");
    }
    newData[id] = {
      ...newData[id],
      amount,
    };
    cartData = newData;
    return res(context.data(newData));
  }),
];
