import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { loginDto, registerDto } from 'src/types/user.type';
import { PrismaService } from 'src/config/prisma/prisma.service';
import ResponseCode, { response } from 'src/domain/response';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}
  private logger = new Logger(AuthService.name);

  async logIn(loginDto: loginDto): Promise<response> {
    try {
      const { password, email } = loginDto;

      //check email
      const userCheck = await this.prismaService.user.findFirst({
        where: { email: email },
      });
      console.log(userCheck);
      if (!userCheck)
        throw new BadRequestException(ResponseCode.failed('Email not found'));
      //check password
      const matchPass = await bcrypt.compare(password, userCheck.password);
      if (!matchPass)
        throw new BadRequestException(ResponseCode.failed('password mismatch'));
      delete userCheck.password;

      return ResponseCode.success({
        token: await this.jwtService.signAsync(userCheck),
        user_id: userCheck.user_id,
        fullname: userCheck.fullname,
      });
    } catch (err) {
      throw new BadRequestException();
    }
  }

  async register(registerUserDto: registerDto): Promise<response> {
    try {
      const {
        email,
        password,
        fullName: fullname,
        dateOfBirth: date_of_birth,
      } = registerUserDto;

      // Check if the user already exists
      const existingUser = await this.prismaService.user.findFirst({
        where: { email: email },
      });
      if (existingUser) {
        this.logger.warn(
          `Attempted to register with an existing email: ${email}`,
        );
        throw new BadRequestException('Email already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await this.prismaService.user.create({
        data: {
          fullname,
          email,
          password: hashedPassword,
          date_of_birth: date_of_birth ? new Date(date_of_birth) : new Date(),
        },
      });

      this.logger.log(`Registered a new user with email: ${newUser.email}`);

      // Remove the password before creating the token
      delete newUser.password;

      // Sign the JWT token with the user_id from newUser object
      const payload = { email: newUser.email, userId: newUser.user_id };

      // Return success response with token
      return ResponseCode.success({
        token: await this.jwtService.signAsync(payload),
      });
    } catch (err) {
      this.logger.error('Registration error:', err);
      // Return or log the detailed error message
      throw new BadRequestException(`Registration failed: ${err.message}`);
    }
  }
}
