import { db } from "@/firebase/admin";
import { NextResponse } from "next/server";
import { auth } from "@/firebase/client";

async function getCurrentUser() {
  return await auth.currentUser;
}

export async function POST(req: Request) {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json(
      { success: false, error: "Missing id" },
      { status: 400 }
    );
  }

  const user = await getCurrentUser();
  // const userId = "tZ3lYZd7qHV5t56V1LmGSWf6t9w1";
  console.log("Current user:", user);
  if (!user) {
    return NextResponse.json(
      { success: false, error: "User not authenticated" },
      { status: 401 }
    );
  }

  console.log("Fetching interview with ID:", id, "for user:", user?.uid);
  try {
    const interviewRef = db
      .collection("users")
      .doc(user?.uid)
      .collection("interviews")
      .doc(id);

    const interviewSnap = await interviewRef.get();

    if (!interviewSnap.exists) {
      return NextResponse.json(
        { success: false, error: "Interview not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: interviewSnap.data() },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching interview:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
