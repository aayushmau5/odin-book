import { object, string } from "joi";
import { UserInputError } from "apollo-server-express";
import { PostInput } from "../../types/PostTypes";

const postInputValidationSchema = object({
  text: string().min(2),
  image: string().min(2),
});

const commentInputValidationSchema = object({
  data: string().min(2).required(),
});

export function validatePostInput({ text, image }: PostInput) {
  const { value, error } = postInputValidationSchema.validate({
    text,
    image,
  });
  if (error) {
    throw new UserInputError(error.message);
  }
  return value;
}

export function validateCommentInput({ data }: { data: string }) {
  const { value, error } = commentInputValidationSchema.validate({
    data,
  });
  if (error) {
    throw new UserInputError(error.message);
  }
  return value;
}
