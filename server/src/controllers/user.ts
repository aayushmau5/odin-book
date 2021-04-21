import { ValidationError } from "apollo-server-errors";
import {
  addUser,
  getUserByEmail,
  setProfile,
  updateCommonProfile,
} from "../utils/db/user";

interface User {
  username: string;
  email: string;
  password: string;
}

interface Login {
  email: string;
  password: string;
}

interface Profile {
  display: string;
  firstname: string;
  lastname: string;
}

interface optionalProfile {
  display?: string;
  firstname?: string;
  lastname?: string;
}

export async function saveUser({ username, email, password }: User) {
  //TODO hash the password before saving
  const hashedPassword = password;
  return await addUser(username, email, hashedPassword);
}

export async function addProfile(userId: string, data: Profile) {
  const profile = await setProfile(userId, data);
  return profile;
}

export async function profileUpdate(profileId: string, data: optionalProfile) {
  const updatedProfile = await updateCommonProfile(profileId, data);
  return updatedProfile;
}

export async function loginUser(
  { email, password }: Login,
  selections: object
) {
  //TODO JWT and stuff
  password;
  const user = await getUserByEmail(email, selections);
  if (!user) {
    const error = new ValidationError("User doesn't exist");
    error.status = 404;
    throw error;
  }
  return user;
}
