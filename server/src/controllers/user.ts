import { getAllUser, getUser, addUser } from "../utils/db";

export async function allUsers() {
  return await getAllUser();
}

export async function getSpecificUser(id: string) {
  return await getUser(id);
}

export async function saveUser({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) {
  return await addUser(username, email, password);
}
