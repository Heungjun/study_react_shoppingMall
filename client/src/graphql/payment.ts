import gql from "graphql-tag";

export const EXECUTE_PAY = gql`
  mutation EXECUTE_PAY($ids: [String!]) {
    executePay(ids: $ids)
  }
`;
