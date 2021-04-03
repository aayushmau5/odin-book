import { getAllUser, getUser, addUser } from "../utils/db";

interface User {
  username: string;
  email: string;
  password: string;
}

export async function allUsers() {
  return await getAllUser();
}

export async function getSpecificUser(id: string) {
  return await getUser(id);
}

export async function saveUser({ username, email, password }: User) {
  return await addUser(username, email, password);
}
