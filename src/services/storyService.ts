import { apiInstance } from "constant";
import { CreateStory } from "types";

const api = apiInstance({
  baseURL: import.meta.env.VITE_STORY_SERVICES_API,
});
export const storyService = {
  getStory: (): Promise<ApiResponse<CreateStory[]>> =>
    api
      .get<ApiResponse<CreateStory[]>>("/getStory")
      .then((response) => response.data),
  createStory: async (data: FormData): Promise<ApiResponse<CreateStory>> => {
    console.log(data);
    const response = await api.post<ApiResponse<CreateStory>>(
      "/createStory",
      data
    );
    return response.data;
  },
  deleteStory: async (storyId: number): Promise<ApiResponse<void>> => {
    const response = await api.delete<ApiResponse<void>>(
      `/deleteStory/${storyId}`
    );
    return response.data;
  },
};
