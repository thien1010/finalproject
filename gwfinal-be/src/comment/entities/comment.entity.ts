import { Prisma } from '.prisma/client';

export class Comment implements Prisma.commentUncheckedCreateInput {
  comment_id: number;
  user_id: number;
  post_id: number;
  message: string;
  fullname_comment: string;
}
