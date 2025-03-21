import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db();
    const usersCollection = db.collection("users");

    const users = await usersCollection.find().toArray();

    res.status(200).json(users);
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    res.status(500).json({ error: "Database connection failed" });
  } finally {
    await client.close();
  }
}
