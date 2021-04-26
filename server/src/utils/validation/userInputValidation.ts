import { object, string } from "joi";
import { UserInputError } from "apollo-server-express";
import { UserInput, ProfileInput } from "../../types/UserProfileTypes";

const userSignupValidationSchema = object({
  password: string().min(6).required(),
  email: string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
});

const userLoginValidationSchema = object({
  email: string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  password: string().min(6).required(),
});

const profileValidationSchema = object({
  firstname: string().min(2).max(20).required(),
  lastname: string().min(2).max(20).required(),
  display: string().min(5),
});

export function validateSignupInput({ password, email }: UserInput) {
  const { value, error } = userSignupValidationSchema.validate({
    password,
    email,
  });
  if (error) {
    throw new UserInputError(error.message);
  }
  return value;
}

export function validateLoginInput({ email, password }: UserInput) {
  const { value, error } = userLoginValidationSchema.validate({
    email,
    password,
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
