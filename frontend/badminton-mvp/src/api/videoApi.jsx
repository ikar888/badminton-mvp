import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/v1/video`;

export async function uploadAndAnalyzeVideo(file) {
  const formData = new FormData();
  formData.append("video", file);

  try {
    const response = await axios.post(`${API_URL}/analyze`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("Video analysis failed:", error);
    throw error;
  }
}
