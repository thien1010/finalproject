import {
  Controller,
  Post,
  UseInterceptors,
  Body,
  Get,
  UploadedFiles,
  Delete,
  Param,
} from '@nestjs/common';
import { PostService } from './post.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createPostDto } from '../types/post.type';
import { FilesInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from 'src/config/multer/multer.config';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('getPost')
  getPost() {
    return this.postService.getPost();
  }

  /**
   * @param files maximum two files
   * @param createPostDto
   */

  @Post('createPost')
  @UseInterceptors(FilesInterceptor('file', 2, MulterOptions))
  async createPost(
    @UploadedFiles() files: Array<Express.Multer.File>,

    @Body() createPostDto: createPostDto,
  ) {
    return this.postService.createPost(createPostDto, files);
  }

  @Delete('deletePost/:postId')
  deletePost(@Param('postId') postId: string): void {
    const postIdNumber = parseInt(postId, 10);
    this.postService.deletePost(postIdNumber);
  }
}
