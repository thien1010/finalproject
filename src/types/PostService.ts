import { PostLike } from "./LikeService";
export type PostView = "gridView" | "listView";

export type CreatePost = {
  post_id: number;
  user_id_create: number;
  fullname_create: string;
  created_at: string;
  content: string;
  caption: string;
  like?: PostLike | null;
};
