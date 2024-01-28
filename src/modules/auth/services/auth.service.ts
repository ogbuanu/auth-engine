import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User } from '../models/user.model';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async login(): Promise<User> {
    const user = this.prismaService.user.findFirst({
      where: { email: 'ogbuanuikenna@gmail.com' },
    });
    return user;
  }
}
