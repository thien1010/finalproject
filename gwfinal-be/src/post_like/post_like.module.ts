import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostLikeController } from './post_like.controller';
import { PostLikeService } from './post_like.service';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { PostLike } from './entities/post_like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostLike])],
  controllers: [PostLikeController],
  providers: [PostLikeService, PrismaService],
})
export class PostLikeModule {}
