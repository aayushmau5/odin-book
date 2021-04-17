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

export async function login({ email, password }: Login) {
  //TODO JWT and stuff
  const user = await getUserByEmail(email);
  if (!user) {
    const error = new ValidationError("User doesn't exist");
    error.status = 404;
    throw error;
  }
  console.log(password);
}
