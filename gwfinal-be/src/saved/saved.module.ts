import { Module } from '@nestjs/common';
import { SavedService } from './saved.service';
import { SavedController } from './saved.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { Saved } from './entities/saved.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Saved])],

  controllers: [SavedController],
  providers: [SavedService, PrismaService],
})
export class SavedModule {}
