import { db_getAllUsers } from "./utils/db/user";

async function main() {
  const users = await db_getAllUsers();
  console.log(users);
}

main().catch((err) => console.error(err));
