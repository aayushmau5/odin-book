import { getAllUser, getUser, addUser, getUserByEmail } from "../utils/user";

interface User {
  username: string;
  email: string;
  password: string;
}

interface Login {
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
  //TODO hash the password before saving
  return await addUser(username, email, password);
}

export async function login({ email, password }: Login) {
  const user = await getUserByEmail(email);
  if (user) {
    console.log(password);
  }
}
