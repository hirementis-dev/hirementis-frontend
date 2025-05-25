import axios from "axios";
import { auth, db } from "./client";

export async function getInterviewById(
  id: string,
  userId: string
): Promise<{
  data?: any;
  success?: boolean;
  error?: string;
}> {
  console.log("getting interview by id", id);
  const res = await axios.post("/api/interviews", {
    id,
    userId,
  });

  if (!res.data.success) {
    return { error: "Not found", success: false, data: null };
  }
  return { data: res.data, success: true };
}

// Get current user from session cookie
export async function getCurrentUser() {
  const user = auth.currentUser;
  if (user !== null) {
    // The user object has basic properties such as display name, email, etc.
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;

    // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
    const uid = user.uid;
  }
  return user;
}
