import { gql } from "apollo-server-express";

export const typeDefs = gql`
  input Signup {
    username: String!
    email: String!
    password: String!
  }

  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Query {
    user(id: ID!): User
    users: [User]
  }

  type Mutation {
    signup(user: Signup!): User
  }
`;
