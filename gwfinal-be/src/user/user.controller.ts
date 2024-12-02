import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/jwt/auth.guard';
import { GetCurrentUserId } from 'src/decorators/get-current-user-id.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(AuthGuard)
  @Get('getUser')
  async getUser() {
    return this.userService.getUser();
  }

  @UseGuards(AuthGuard)
  @Post('getInfo')
  async getInfo(@GetCurrentUserId() userId: string) {
    //console.log("userId: ", userId);
    return this.userService.getInfo(userId);
  }
}
