import { apiInstance } from "constant";
import { PostLike } from "types";

const api = apiInstance({
  baseURL: import.meta.env.VITE_LIKE_SERVICES_API,
});

export const likeService = {
  getLikesByUserAndPost: (userId: number, postId: number) => {
    return api.get<PostLike[]>(`/${userId}/${postId}`);
  },
  createPostLike: (userId: number, postId: number) => {
    return api.post(`/${userId}/${postId}`);
  },
  deletePostLike: (likeId: number) => {
    return api.delete(`/${likeId}`);
  },
};
