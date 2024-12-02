import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSavedDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  postId: number;
}
