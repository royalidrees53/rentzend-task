import gql from "graphql-tag";

const GET_AGENTS = gql`
  {
    agents {
      id
      name
      email
      address
      zipcode
    }
  }
`;

export { GET_AGENTS };
