import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { MONGODB_URI, SENDER_EMAIL } from "../constants/env";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { resend } from "../resend";

const client = new MongoClient(MONGODB_URI);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db),

  emailAndPassword: {  
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        from: SENDER_EMAIL,
        to: user.email,
        subject: "Reset your password",
        text: `Click the link to reset your password: ${url}`,
      });
    },
  }, 

  plugins: [nextCookies()],
});