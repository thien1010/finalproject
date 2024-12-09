import { Prisma } from '.prisma/client';

export class Saved implements Prisma.savedUncheckedCreateInput {
  saved_id: number;
  user_id: number;
  post_id: number;
  saved_date?: Date;
}
