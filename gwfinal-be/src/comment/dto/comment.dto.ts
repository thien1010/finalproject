import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  postId: number;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsString()
  fullnameComment: string;
}

export class UpdateCommentDto {
  @IsString()
  message: string;
}
