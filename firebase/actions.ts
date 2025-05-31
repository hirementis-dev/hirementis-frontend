import axios from "axios";
import { db } from "./client";
import { doc, getDoc } from "firebase/firestore";

export async function getInterviewById(
  id: string,
  userId: string
): Promise<{
  data?: any;
  success?: boolean;
  error?: string;
}> {
  const res = await axios.post("/api/interviews", {
    id,
    userId,
  });

  if (!res.data.success) {
    return { error: "Not found", success: false, data: null };
  }
  return { data: res.data, success: true };
}

export async function getUserDocument(uid: string) {
  try {
    const userDocRef = doc(db, "users", uid); // Replace "users" with your collection name
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      return userData;
    } else {
      console.log("User document not found");
      return null;
    }
  } catch (error) {
    console.error("Error getting user document:", error);
    return null;
  }
}
