import { Resend } from 'resend';
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

export const resend = new Resend(process.env.RESEND_API_KEY);
