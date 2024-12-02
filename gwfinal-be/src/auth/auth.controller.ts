import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto, registerDto } from 'src/types/user.type';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiBearerAuth()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  logIn(@Body() logInDto: loginDto) {
    return this.authService.logIn(logInDto);
  }

  @Post('register')
  async register(@Body() registerUserDto: registerDto) {
    return this.authService.register(registerUserDto);
  }
}
