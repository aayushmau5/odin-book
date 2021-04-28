import { gql } from "apollo-server-express";

const inputs = gql`
  input Signup {
    email: String!
    password: String!
  }

  input Login {
    email: String!
    password: String!
  }

  input AddPost {
    text: String
    image: String
  }

  input ProfileData {
    firstname: String
    lastname: String
    display: String
  }

  input OAuthInput {
    idToken: String!
  }
`;

export default inputs;
