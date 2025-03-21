import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/action";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET() {
  const session = await getServerSession();
  console.log("Session Data:", session); // Debugging

  if (!session) {
    console.log("Unauthorized access attempt");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { db } = await connectToDatabase();
    if (!db) {
      console.log("Database connection failed");
      return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
    }

    console.log("Fetching users from database...");

    // Fetch all users from the "users" collection
    const users = await db
      .collection("users")
      .find({})
      .map((user) => ({
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      }))
      .toArray();

    console.log("Fetched users:", users);
    return NextResponse.json(users.length ? users : []);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
