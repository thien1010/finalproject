// export type CreateStory = {
//   story_id: number;
//   user_id_story: number;
//   fullname_story: string;
//   content_story: string;
//   created_story: Date;
// };
export type CreateStory = {
  story_id: number;
  user_id_story: number;
  fullname_story: string;
  content_story: string;
  created_story: Date;
  expiresAt: Date; // This is the new property to track expiration
};
