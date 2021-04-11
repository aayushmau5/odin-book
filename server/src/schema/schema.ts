import { gql } from "apollo-server-express";

export const typeDefs = gql`
  input Signup {
    username: String!
    email: String!
    password: String!
  }

  input AddPost {
    userId: ID!
    data: String!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    posts: [Post]
  }

  type Demo {
    id: ID!
    username: String!
    email: String!
  }

  type Post {
    data: String!
  }

  type Query {
    user(id: ID!): User
    users: [User]
    postByUser(id: ID!): [Post]
    demo: Demo!
  }

  type Mutation {
    signup(user: Signup!): User
    addPost(data: AddPost!): User
  }
`;
