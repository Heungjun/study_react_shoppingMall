import { lazy } from "react";
import Cart from "./pages/cart";
import GlobalLayout from "./pages/_layout";

const Index = lazy(() => import("./pages/index"));
const ProductIndex = lazy(() => import("./pages/products/index"));
const ProductsId = lazy(() => import("./pages/products/[id]"));

export const routes = [
  {
    path: "/",
    element: <GlobalLayout />,
    children: [
      { path: "/", element: <Index />, index: true },
      { path: "/products", element: <ProductIndex />, index: true },
      { path: "/products/:id", element: <ProductsId /> },
      { path: "/cart", element: <Cart /> },
    ],
  },
];

export const pages = [
  { route: "/" },
  { route: "/products" },
  { route: "/products/:id" },
  { route: "/cart" },
];
