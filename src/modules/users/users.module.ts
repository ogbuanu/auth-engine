import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { PrismaService } from 'src/prisma.service';
// import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [UsersService, PrismaService],
  controllers: [UsersController],
  imports: [],
})
export class UsersModule {}
