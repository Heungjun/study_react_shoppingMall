import gql from "graphql-tag";

export const EXECUTE_PAY = gql`
  mutation ADD_CART($info: [String!]) {
    payInfo(info: $info)
  }
`;
