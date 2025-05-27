import axios from "axios";
import { auth, db } from "./client";
import { onAuthStateChanged, User } from "firebase/auth";

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
