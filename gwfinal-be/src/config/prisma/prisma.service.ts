import {
  Injectable,
  OnModuleInit,
  OnApplicationShutdown,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnApplicationShutdown
{
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async onApplicationShutdown(signal?: string) {
    await this.$disconnect();
  }

  async onModuleInit() {
    try {
      await this.$connect();
      console.log('Database connection established successfully.');
    } catch (error) {
      console.error('Failed to connect to the database:', error);
    }
  }
}
