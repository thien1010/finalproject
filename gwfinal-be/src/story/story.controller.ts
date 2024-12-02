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
import { StoryService } from './story.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createStoryDto } from '../types/story.type';
import { FilesInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from 'src/config/multer/multer.config';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Story')
@Controller('story')
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @Get('getStory')
  getStory() {
    return this.storyService.getStory();
  }

  /**
   * @param files maximum 1 file
   * @param createStoryDto
   */

  @Post('createStory')
  @UseInterceptors(FilesInterceptor('file', 1, MulterOptions))
  async createStory(
    @UploadedFiles() files: Array<Express.Multer.File>,

    @Body() createStoryDto: createStoryDto,
  ) {
    return this.storyService.createStory(createStoryDto, files);
  }

  @Delete('deleteStory/:storyId')
  deleteStory(@Param('storyId') storyId: string): void {
    const storyIdNumber = parseInt(storyId, 10);
    this.storyService.deleteStory(storyIdNumber);
  }
}
