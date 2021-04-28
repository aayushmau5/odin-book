import { AuthenticationError } from "apollo-server-errors";
import { sign, verify } from "jsonwebtoken";

const jwtSecret: string = process.env.JWT_SECRET || "super_super_secret_jwt";

export async function generateJwt(userId: string) {
  const payload = {
    userId,
  };

  const token = await sign(payload, jwtSecret, {
    expiresIn: "1d",
  });

  return token;
}

export function verifyJwt(token: string) {
  try {
    const { userId }: any = verify(token, jwtSecret);
    return userId;
  } catch (err) {
    throw new AuthenticationError(err.message);
  }
}
