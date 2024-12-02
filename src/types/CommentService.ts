export type PostComment = {
  user_id: number;
  post_id: number;
  message: string;
  fullname_comment: string;
};
export type UpdateComment = {
  message: string;
};
