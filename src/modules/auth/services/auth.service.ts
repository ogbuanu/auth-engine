import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from '../dtos/create-user.request';
// import { User } from '../models/user.model';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.prismaService.user.findFirst({
      where: { email, password },
    });
    return user;
  }
  async login(user: CreateUserDto): Promise<User> {
    // validate if user exists
    const userExists = await this.validateUser(user.email, user.password);
    if (userExists) {
      return userExists;
    }
    return null;
  }
  async register(): Promise<User> {
    const user = await this.prismaService.user.create({
      data: {
        first_name: 'ogbuanui',
        last_name: 'kenna',
        email: 'ogbuanuikenna@gmail.com',
        password: 'password',
      },
    });
    return user;
  }
}
