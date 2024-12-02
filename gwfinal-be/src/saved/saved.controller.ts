import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  ParseIntPipe,
} from '@nestjs/common';
import { SavedService } from './saved.service';
import { CreateSavedDto } from './dto/saved.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Save')
@Controller('saved')
export class SavedController {
  constructor(private readonly savedService: SavedService) {}

  @Get(':postId')
  async getSavedByPostId(@Param('postId', ParseIntPipe) postId: number) {
    return this.savedService.getSavedByPostId(postId);
  }

  @Post(':userId/:postId')
  async createSaved(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('postId', ParseIntPipe) postId: number,
    @Body() createSavedDto: CreateSavedDto,
  ) {
    return this.savedService.createSaved({
      ...createSavedDto,
      userId,
      postId,
    });
  }
}
