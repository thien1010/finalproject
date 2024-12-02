import { apiInstance } from "constant";
import { PostComment } from "types";
import { UpdateComment } from "types";

const api = apiInstance({
  baseURL: import.meta.env.VITE_COMMENT_SERVICES_API,
});

export const commentService = {
  getCommentsByPostId: async (postId: number): Promise<PostComment[]> => {
    try {
      const response = await api.get(`/getuserbypostid/${postId}`);
      return response.data;
    } catch (error) {
      console.error("Error getting comments:", error);
      throw error;
    }
  },

  createComment: async (
    postId: number,
    userId: number,
    PostComment: PostComment
  ): Promise<PostComment> => {
    try {
      const response = await api.post<PostComment>(
        `${userId}/${postId}`,
        PostComment
      );
      return response.data;
    } catch (error) {
      console.error("Error creating comment:", error);
      throw error;
    }
  },

  deleteComment: async (commentId: number): Promise<void> => {
    try {
      await api.delete(`/${commentId}`);
    } catch (error) {
      console.error("Error deleting comment:", error);
      throw error;
    }
  },

  updateComment: async (
    commentId: number,
    updatedComment: UpdateComment
  ): Promise<PostComment> => {
    try {
      const response = await api.patch<PostComment>(
        `/${commentId}`,
        updatedComment
      );
      return response.data;
    } catch (error) {
      console.error("Error updating comment:", error);
      throw error;
    }
  },
};
