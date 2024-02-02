import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from '../users/services/users.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    UsersService,
    JwtStrategy,
    PassportModule,
  ],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
      global: true,
    }),
  ],
})
export class AuthModule {}
