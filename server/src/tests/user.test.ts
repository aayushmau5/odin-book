import faker from "faker";

import { prisma } from "../utils/db/db";
import { graphqlCall } from "./helpers";

afterAll((done) => {
  prisma.$disconnect();
  done();
});

const userSignupMutation = `
mutation Signup($email: String!, $password: String!) {
  signup(email: $email, password: $password) {
    user {
      id
      email
      profile {
        id
      }
    }
    token
  }
}
`;

const profileCreationMutation = `
mutation CreateProfile($data: ProfileInput!) {
  createProfile(data: $data) {
    id
    firstname
    lastname
    fullName
    display
  }
}
`;

let userResult: any;
let profileResult: any;

describe("User Resolvers", () => {
  it("Creates user", async (done) => {
    const userData = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    userResult = await graphqlCall({
      source: userSignupMutation,
      variableValues: {
        email: userData.email,
        password: userData.password,
      },
    });

    expect(userResult).toMatchObject({
      data: {
        signup: {
          user: {
            email: userData.email,
            profile: null,
          },
        },
      },
    });

    done();
  }, 30000);

  it("Creates Profile", async (done) => {
    const profileData = {
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      display: faker.internet.url(),
    };

    profileResult = await graphqlCall({
      source: profileCreationMutation,
      variableValues: {
        data: profileData,
      },
      token: userResult.data.signup.token,
    });

    expect(profileResult).toMatchObject({
      data: {
        createProfile: {
          firstname: profileData.firstname,
          lastname: profileData.lastname,
          fullName: `${profileData.firstname} ${profileData.lastname}`,
          display: profileData.display,
        },
      },
    });

    done();
  }, 30000);
});
