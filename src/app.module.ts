import { Module } from '@nestjs/common';

import { AuthModule } from './modules/auth/auth.module';
import { PrismaService } from './prisma.service';

// import { CommonModule } from './modules/common/common.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
