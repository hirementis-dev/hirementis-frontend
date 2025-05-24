import axios from "axios";

export async function getInterviewById(id: string): Promise<{
  data?: any;
  success?: boolean;
  error?: string;
}> {
  console.log("getting interview by id", id);
  const res = await axios.post("/api/interviews", {
    id,
  });

  if (!res.data.success) {
    return { error: "Not found", success: false, data: null };
  }
  return { data: res.data, success: true };
}
