import { apiInstance } from "constant";
import { CreatePost } from "types/PostService";

const api = apiInstance({
  baseURL: import.meta.env.VITE_POST_SERVICES_API,
});
export const postService = {
  getPost: (): Promise<ApiResponse<CreatePost[]>> =>
    api
      .get<ApiResponse<CreatePost[]>>("/getPost")
      .then((response) => response.data),
  createPost: async (data: FormData): Promise<ApiResponse<CreatePost>> => {
    console.log(data);
    const response = await api.post<ApiResponse<CreatePost>>(
      "/createPost",
      data
    );
    return response.data;
  },
  deletePost: async (postId: number): Promise<ApiResponse<void>> => {
    const response = await api.delete<ApiResponse<void>>(
      `/deletePost/${postId}`
    );
    return response.data;
  },
};
