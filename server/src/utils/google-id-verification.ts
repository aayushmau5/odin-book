import { AuthenticationError } from "apollo-server-errors";
import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function verifyGoogleId(token: string) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    return payload;
  } catch (err) {
    throw new AuthenticationError("Email cannot be verified");
  }
}
