import { ConflictException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from 'src/modules/auth/dtos/create-user.request';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users;
  }
  async create(createUserDto: CreateUserDto): Promise<User> {
    const userExists = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });
    if (userExists) {
      throw new ConflictException('User already exists');
    }
    const user = await this.prisma.user.create({
      data: createUserDto,
    });
    return user;
  }
}
