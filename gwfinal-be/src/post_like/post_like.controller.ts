import { Controller, Post, Delete, Param, HttpCode, Get } from '@nestjs/common';
import { PostLikeService } from './post_like.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PostLike } from './entities/post_like.entity';
@ApiBearerAuth()
@ApiTags('Like')
@Controller('post-like')
export class PostLikeController {
  constructor(private postLikeService: PostLikeService) {}

  @Get(':userId/:postId')
  async getLikesByUserAndPost(
    @Param('userId') userId: number,
    @Param('postId') postId: number,
  ): Promise<PostLike[]> {
    return await this.postLikeService.getLikesByUserAndPost(userId, postId);
  }

  @Post(':userId/:postId')
  async createPostLike(
    @Param('userId') userId: number,
    @Param('postId') postId: number,
  ) {
    return await this.postLikeService.createPostLike(userId, postId);
  }

  @Delete(':likeId')
  @HttpCode(204)
  async deletePostLike(@Param('likeId') likeId: number) {
    await this.postLikeService.deletePostLike(likeId);
  }
}
