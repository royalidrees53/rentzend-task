const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Agent {
    id: ID!
    name: String!
    email: String!
    zipcode: String!
    number: String!
    address: String!
    document: String
  }

  type ApiResponse {
    success: Boolean!
    agent: Agent
    message: String
  }

  type Query {
    agents: [Agent!]!
  }

  type Mutation {
    createAgent(
      name:String!
      email: String!
      zipcode: String!
      number: String!
      address: String!
      document: Upload!
    ): ApiResponse
  }
`;

module.exports = typeDefs;
