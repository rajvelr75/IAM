import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { MONGODB_URI } from "../constants/env";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(MONGODB_URI);
const db = client.db()
 
export const auth = betterAuth({
    
    database: mongodbAdapter(db),

    emailAndPassword: {  
        enabled: true
    },

    plugins: [nextCookies()]
})