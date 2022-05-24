import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { request, RequestDocument } from "graphql-request";
// import { getTodos, postTodo } from "../my-api";

type AnyOBJ = { [Key: string]: any };

export const getClient = (() => {
  let client: QueryClient | null = null;
  return () => {
    if (!client)
      client = new QueryClient({
        defaultOptions: {
          queries: {
            cacheTime: Infinity,
            staleTime: Infinity,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
          },
        },
      });
    return client;
  };
})();

// const BASE_URL = import.meta.env.VITE_SERVER_URL as string;
const BASE_URL = "https://localhost:3000";
const FAKE_API_URL = "https://fakestoreapi.com";

export const restFetcher = async ({
  method,
  path,
  body,
  params,
}: {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
  body?: AnyOBJ;
  params?: AnyOBJ;
}) => {
  try {
    let url = `${FAKE_API_URL}${path}`;
    const fetchOptions: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": FAKE_API_URL,
      },
    };
    if (params) {
      const searchParams = new URLSearchParams(params);
      url += "?" + searchParams.toString();
    }

    if (body) fetchOptions.body = JSON.stringify(body);

    const res = await fetch(url, fetchOptions);
    const json = await res.json();
    return json;
  } catch (err) {
    console.log(err);
  }
};

export const graphqlFetcher = (query: RequestDocument, variables = {}) =>
  request(`${BASE_URL}/graphql`, query, variables, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": BASE_URL,
  });

export const QueryKeys = {
  PRODUCTS: "PRODUCTS",
  CART: "CART",
};
