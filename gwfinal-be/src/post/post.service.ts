import {
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import ResponseCode from 'src/domain/response';
import { createPostDto } from 'src/types/post.type';
import { HandleFile } from 'src/util/file.util';

@Injectable()
export class PostService {
  private readonly logger = new Logger(PostService.name);
  constructor(
    private prisma: PrismaService,
    private handleFile: HandleFile,
  ) {}

  async getPost() {
    try {
      const posts = await this.prisma.post.findMany();
      return ResponseCode.success(posts, 'success', HttpStatus.OK);
    } catch (error) {
      return ResponseCode.failed('Failed to retrieve posts');
    }
  }

  async createPost(
    createPostDto: createPostDto,
    files: Array<Express.Multer.File>,
  ) {
    const { user_id_create, caption, content } = createPostDto;
    console.log('createPostDto: ', createPostDto);

    // Check if user exists
    const userExists = await this.prisma.user.findUnique({
      where: { user_id: Number(user_id_create) },
    });

    if (!userExists) {
      this.logger.error(`User with ID ${user_id_create} not found`);
      throw new NotFoundException(`User with ID ${user_id_create} not found`);
    }

    try {
      const data: {
        user_id_create: number;
        fullname_create: string;
        caption: string;
        content: string;
        created_at: Date;
      } = {
        user_id_create: Number(user_id_create),
        fullname_create: userExists.fullname,
        caption: caption || '',
        content: content || '',
        created_at: new Date(),
      };

      if (files.length) {
        const arrFile = this.handleFile.multipleBase64(files);
        data.content = arrFile[0];
      }

      // Create new post
      const post = await this.prisma.post.create({ data });
      if (post && files.length) {
        this.handleFile.DeleteFiles(files.map((file) => file.path));
      }
      this.logger.log(`New post created: ${JSON.stringify(post, null, 2)}`);
      return ResponseCode.success(
        post,
        'Post created successfully',
        HttpStatus.OK,
      );
    } catch (error) {
      this.logger.error(`Failed to create post: ${error.message}`);
      return ResponseCode.failed('Failed to create post');
    }
  }
  async deletePost(postId: number) {
    try {
      const post = await this.prisma.post.findUnique({
        where: { post_id: postId },
      });

      if (!post) {
        throw new NotFoundException(`Post with ID ${postId} not found`);
      }

      await this.prisma.post.delete({
        where: { post_id: postId },
      });

      this.logger.log(`Post with ID ${postId} deleted successfully`);
      return ResponseCode.success(
        null,
        'Post deleted successfully',
        HttpStatus.OK,
      );
    } catch (error) {
      this.logger.error(`Failed to delete post: ${error.message}`);
      return ResponseCode.failed('Failed to delete post');
    }
  }
}
