import { DBField, writeDB } from "../dbController";
import { Resolver, Cart } from "./types";

const setJSON = (data: Cart) => writeDB(DBField.CART, data);

const cartResolver: Resolver = {
  Query: {
    cart: (parent, args, { db }, info) => {
      return db.cart;
    },
  },
  Mutation: {
    addCart: (parent, { id }, { db }, info) => {
      if (!id) throw Error("상품 idrk 없습니다.");

      const targetProduct = db.products.find((item) => item.id === id);
      if (!targetProduct) {
        throw new Error("상품이 없습니다.");
      }

      const existCartIndex = db.cart.findIndex((item) => item.id === id);
      if (existCartIndex > -1) {
        const newCartItem = {
          id,
          amount: db.cart[existCartIndex].amount + 1,
        };
        db.cart.splice(existCartIndex, 1, newCartItem);
        setJSON(db.cart);
        return newCartItem;
      }

      const newItem = {
        id,
        amount: 1,
        product: targetProduct,
      };

      db.cart.push(newItem);
      setJSON(db.cart);
      return newItem;
    },

    updateCart: (parent, { id, amount }, { db }, info) => {
      const existCartIndex = db.cart.findIndex((item) => item.id === id);

      if (existCartIndex < 0) {
        throw new Error("없는 데이터 입니다.");
      }
      const newCartItem = {
        id,
        amount,
      };
      db.cart.splice(existCartIndex, 1, newCartItem);
      setJSON(db.cart);
      return newCartItem;
    },
    deleteCart: (parent, { id }, { db }, info) => {
      const existCartIndex = db.cart.findIndex((item) => item.id === id);

      if (existCartIndex < 0) {
        throw new Error("없는 데이터 입니다.");
      }
      db.cart.splice(existCartIndex, 1);
      setJSON(db.cart);

      return id;
    },
    executePay: (parent, { ids }, context, info) => {
      const newCartData = cartData.filter(
        (cartItem) => !ids.includes(cartItem.id)
      );
      cartData = newCartData;
      return ids;
    },
  },
  CartItem: {
    product: (cartItem, args, { db }) =>
      db.products.find((product: any) => product.id === cartItem.id),
  },
};

export default cartResolver;
