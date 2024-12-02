import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StoryController } from './story.controller';
import { StoryService } from './story.service';
import { PrismaModule } from '../config/prisma/prisma.module';
import { HandleFile } from 'src/util/file.util';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule, PrismaModule, ConfigModule, AuthModule],
  controllers: [StoryController],
  providers: [StoryService, HandleFile],
})
export class StoryModule {}
