import { gql } from "apollo-server-core";

const userTypeDefs = gql`
  type User {
    id: ID!
    email: String!
    profile: ProfileWithoutUser
    createdAt: DateTime!
  }

  type UserWithoutProfile {
    id: ID!
    email: String!
    createdAt: DateTime!
  }

  type Token {
    user: UserWithoutProfile!
    token: String!
  }

  type Profile {
    id: ID!
    firstname: String!
    lastname: String!
    display: String
    friends: [friendsProfile]
    user: UserWithoutProfile!
    posts: [Post]
    friendrequest_to: [requestProfile]
    friendrequest_by: [requestProfile]
  }

  type ChangedProfile {
    id: ID!
    firstname: String!
    lastname: String!
    display: String
  }

  type ProfileWithoutUser {
    id: ID!
    firstname: String!
    lastname: String!
    display: String
    friends: [friendsProfile]
    posts: [PostWithoutAuthor]
    friendrequest_to: [requestProfile]
    friendrequest_by: [requestProfile]
  }
  type friendsProfile {
    id: ID!
    firstname: String!
    lastname: String!
    display: String
    user: UserWithoutProfile!
    friends_posts: [PostWithoutAuthor]
  }

  type requestProfile {
    id: ID!
    firstname: String!
    lastname: String!
    display: String
    userId: ID!
  }

  type FriendRequests {
    id: ID!
    friendrequest_to: [requestProfile]
    friendrequest_by: [requestProfile]
  }

  type AcceptedRequests {
    friends: [requestProfile]
  }
`;

export default userTypeDefs;
