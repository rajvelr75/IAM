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

    console.log("Querying organizations for user ID:", session.user.id);
    
    const organizations = await db
      .collection("organizations")
      .find({ userId: new ObjectId(session.user.id) })
      .toArray();

    console.log("Fetched organizations:", organizations);
    return NextResponse.json(organizations.length ? organizations : []);
  } catch (error) {
    console.error("Error fetching organizations:", error);
    return NextResponse.json({ error: "Failed to fetch organizations" }, { status: 500 });
  }
}