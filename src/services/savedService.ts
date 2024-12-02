import { apiInstance } from "constant";
import { SavedPost } from "types";

const api = apiInstance({
  baseURL: import.meta.env.VITE_SAVED_SERVICES_API,
});

export const savedService = {
  getSavedByPostId: async (postId: number): Promise<SavedPost[]> => {
    try {
      const response = await api.get(`/${postId}`);
      return response.data;
    } catch (error) {
      console.error("Failed to retrieve saved posts by postId:", error);
      throw error;
    }
  },

  createSavedPost: async (
    postId: number,
    userId: number
  ): Promise<SavedPost> => {
    try {
      const response = await api.post<SavedPost>(`${userId}/${postId}`);
      return response.data;
    } catch (error) {
      console.error("Failed to create saved post:", error);
      throw error;
    }
  },
};
