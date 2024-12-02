import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './config/prisma/prisma.service';
import { PostModule } from './post/post.module';
import { PostLikeModule } from './post_like/post_like.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentModule } from './comment/comment.module';
import { StoryModule } from './story/story.module';
import { Comment } from './comment/entities/comment.entity';
import { PostLike } from './post_like/entities/post_like.entity';
import { SavedModule } from './saved/saved.module';
import { Saved } from './saved/entities/saved.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    PostModule,
    PostLikeModule,
    CommentModule,
    StoryModule,
    SavedModule,
    TypeOrmModule.forRoot({
      // type: 'mysql',
      // host: 'mysql-1d631f1c-gokuhieu-72d6.d.aivencloud.com',
      // port: 19401,
      // username: 'avnadmin',
      // password: 'AVNS_BCWGX9GoMZoZvLM2K1Y',
      // database: 'defaultdb',
      // entities: [PostLike, Comment, Saved],
      // synchronize: true,
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '12345678',
      database: 'gwfinal',
      entities: [PostLike, Comment, Saved],
      synchronize: true,
    }),
  ],
  providers: [PrismaService],
})
export class AppModule {}
