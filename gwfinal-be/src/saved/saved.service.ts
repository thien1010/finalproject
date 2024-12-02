import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { CreateSavedDto } from './dto/saved.dto';

@Injectable()
export class SavedService {
  constructor(private prisma: PrismaService) {}

  async createSaved(createSavedDto: CreateSavedDto) {
    const { userId, postId } = createSavedDto;

    try {
      const user = await this.prisma.user.findUnique({
        where: { user_id: userId },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const post = await this.prisma.post.findUnique({
        where: { post_id: postId },
      });
      if (!post) {
        throw new NotFoundException('Post not found');
      }
      return await this.prisma.saved.create({
        data: {
          user_id: userId,
          post_id: postId,
        },
      });
    } catch (error) {
      console.error('Failed to create saved record:', error);
      throw new InternalServerErrorException('Internal server error');
    }
  }

  // Ensure that parameters are being passed and used correctly
  async getSavedByPostId(postId: number) {
    const saved = await this.prisma.saved.findMany({
      where: { post_id: postId },
      include: { user: true, post: true },
    });

    if (saved.length === 0) {
      throw new NotFoundException(
        `No saved records found for post ID ${postId}`,
      );
    }

    return saved;
  }
}
