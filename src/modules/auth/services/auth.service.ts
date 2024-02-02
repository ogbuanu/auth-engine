import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { LoginUserDto } from '../dtos/login.request';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../dtos/create-user.request';
import { UsersService } from 'src/modules/users/services/users.service';
// import { User } from '../models/user.model';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.prismaService.user.findFirst({
      where: { email },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const validatedPassword = await bcrypt.compare(password, user.password);
    if (!validatedPassword) {
      throw new NotFoundException('Invalid password');
    }
    return user;
  }
  async login(user: LoginUserDto) {
    // validate if user exists
    const userExists = await this.validateUser(user.email, user.password);
    if (!userExists) {
      throw new NotFoundException('User not found');
    }
    if (userExists.is_deleted || !userExists.is_active) {
      throw new NotFoundException('User cannot be logged in');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = userExists;
    return {
      toke: this.jwtService.sign({
        id: userExists.id,
        email: userExists.email,
        account_type: userExists.account_type,
        account_mode: userExists.account_mode,
      }),
      user: result,
    };
  }
  async register(createDto: CreateUserDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.userService.create(createDto);
    return {
      token: this.jwtService.sign({
        id: user.id,
        email: user.email,
        account_type: user.account_type,
        account_mode: user.account_mode,
      }),
      user: user,
    };
  }
}
