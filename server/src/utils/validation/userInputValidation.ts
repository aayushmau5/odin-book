import { object, string } from "joi";
import { UserInputError } from "apollo-server-express";
import {
  UserInput,
  ProfileInput,
  OAuthUserInput,
} from "../../types/UserProfileTypes";

const userValidationSchema = object({
  email: string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  password: string().min(6).required(),
});

const oauthUserValidationSchema = object({
  idToken: string().min(1).required(),
});

const profileValidationSchema = object({
  firstname: string().min(2).max(20).required(),
  lastname: string().min(2).max(20).required(),
  display: string().min(5),
});

export function validateUserDataInput({ email, password }: UserInput) {
  const { value, error } = userValidationSchema.validate({
    email,
    password,
  });
  if (error) {
    throw new UserInputError(error.message);
  }
  return value;
}

export function validateOAuthUserDataInput({ idToken }: OAuthUserInput) {
  const { value, error } = oauthUserValidationSchema.validate({
    idToken,
  });
  if (error) {
    throw new UserInputError(error.message);
  }
  return value;
}

export function validateProfileInput({
  firstname,
  lastname,
  display,
}: ProfileInput) {
  const { value, error } = profileValidationSchema.validate({
    firstname,
    lastname,
    display,
  });
  if (error) {
    throw new UserInputError(error.message);
  }
  return value;
}
