// File: pages/api/users.ts
import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI as string;
const DB_NAME = "nextjs-auth"; // Your database name

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    const db = client.db(DB_NAME);
    const usersCollection = db.collection("user");

    const users = await usersCollection.find().toArray();
    res.status(200).json(users);
  } catch (error) {
    console.error("❌ MongoDB Error:", error);
    res.status(500).json({ error: "Database connection failed" });
  }
}
