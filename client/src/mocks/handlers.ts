import { context, graphql } from "msw";
import { v4 as uuid } from "uuid";
import {
  ADD_CART,
  CartType,
  DELETE_CART,
  GET_CART,
  UPDATE_CART,
} from "../graphql/cart";
import { EXECUTE_PAY } from "../graphql/payment";
import GET_PRODUCTS, { GET_PRODUCT } from "../graphql/products";

const mock_products = Array.from({ length: 20 }).map((_, i) => ({
  // id: uuid(),
  id: i + 1 + "",
  // imageUrl: `https://placeimg.com/200/150/${i + 1}`,
  imageUrl: `https://picsum.photos/id/${i + 10}/200/150`,
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
    const newCartData = { ...cartData };
    const id = req.variables.id;
    const targetProduct = mock_products.find(
      (item) => item.id === req.variables.id
    );
    if (!targetProduct) {
      throw new Error("상품이 없습니다.");
    }

    const newItem = {
      ...targetProduct,
      amount: (newCartData[id]?.amount || 0) + 1,
    };
    newCartData[id] = newItem;
    cartData = newCartData;

    return res(context.data(newItem));
  }),

  graphql.mutation(UPDATE_CART, (req, res, context) => {
    const newData = { ...cartData };
    const { id, amount } = req.variables;
    if (!newData[id]) {
      throw new Error("없는 데이터 입니다.");
    }
    const newItem = {
      ...newData[id],
      amount,
    };
    newData[id] = newItem;
    cartData = newData;
    return res(context.data(newItem));
  }),

  graphql.mutation(DELETE_CART, ({ variables: { id } }, res, context) => {
    const newData = { ...cartData };
    delete newData[id];
    cartData = newData;
    return res(context.data(id));
  }),

  graphql.mutation(EXECUTE_PAY, ({ variables: ids }, res, context) => {
    ids.forEach((id: string) => delete cartData[id]);
    return res(context.data(ids));
  }),
];
