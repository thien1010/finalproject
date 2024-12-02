import {
  Controller,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Get,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto, UpdateCommentDto } from './dto/comment.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiBearerAuth()
@ApiTags('Comment')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('getuserbypostid/:postId')
  async getCommentByPostId(@Param('postId') postId: string) {
    return this.commentService.getCommentsByPostId(postId);
  }

  @Post(':userId/:postId')
  async createComment(
    @Param('userId') userId: number,
    @Param('postId') postId: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    console.log(createCommentDto);
    return this.commentService.createComment(
      +userId,
      +postId,
      createCommentDto,
    );
  }

  @Delete(':id')
  async deleteComment(@Param('id') id: number) {
    return this.commentService.deleteComment(+id);
  }

  @Patch(':id')
  async updateComment(
    @Param('id') id: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentService.updateComment(+id, updateCommentDto);
  }
}
