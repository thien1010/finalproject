import {
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import ResponseCode from 'src/domain/response';
import { createStoryDto } from 'src/types/story.type';
import { HandleFile } from 'src/util/file.util';

@Injectable()
export class StoryService {
  private readonly logger = new Logger(StoryService.name);
  constructor(
    private prisma: PrismaService,
    private handleFile: HandleFile,
  ) {}

  async getStory() {
    try {
      const stories = await this.prisma.story.findMany();
      return ResponseCode.success(stories, 'success', HttpStatus.OK);
    } catch (error) {
      return ResponseCode.failed('Failed to retrieve stories');
    }
  }

  async createStory(
    createStoryDto: createStoryDto,
    files: Array<Express.Multer.File>,
  ) {
    const { user_id_story, content_story } = createStoryDto;
    console.log('createStoryDto: ', createStoryDto);

    // Check if user exists
    const userExists = await this.prisma.user.findUnique({
      where: { user_id: Number(user_id_story) },
    });

    if (!userExists) {
      this.logger.error(`User with ID ${user_id_story} not found`);
      throw new NotFoundException(`User with ID ${user_id_story} not found`);
    }

    try {
      const data: {
        user_id_story: number;
        fullname_story: string;
        content_story: string;
        created_story: Date;
      } = {
        user_id_story: Number(user_id_story),
        fullname_story: userExists.fullname,
        content_story: content_story || '',
        created_story: new Date(),
      };

      if (files.length) {
        const arrFile = this.handleFile.multipleBase64(files);
        data.content_story = arrFile[0];
      }

      // Create new story
      const story = await this.prisma.story.create({ data });
      if (story && files.length) {
        this.handleFile.DeleteFiles(files.map((file) => file.path));
      }
      this.logger.log(`New story created: ${JSON.stringify(story, null, 1)}`);
      return ResponseCode.success(
        story,
        'Story created successfully',
        HttpStatus.OK,
      );
    } catch (error) {
      this.logger.error(`Failed to create story: ${error.message}`);
      return ResponseCode.failed('Failed to create story');
    }
  }
  async deleteStory(storyId: number) {
    try {
      const story = await this.prisma.story.findUnique({
        where: { story_id: storyId },
      });

      if (!story) {
        throw new NotFoundException(`Story with ID ${storyId} not found`);
      }

      await this.prisma.story.delete({
        where: { story_id: storyId },
      });

      this.logger.log(`Story with ID ${storyId} deleted successfully`);
      return ResponseCode.success(
        null,
        'Story deleted successfully',
        HttpStatus.OK,
      );
    } catch (error) {
      this.logger.error(`Failed to delete story: ${error.message}`);
      return ResponseCode.failed('Failed to delete story');
    }
  }
}
