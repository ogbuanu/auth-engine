import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from '../dtos/create-user.request';
import { LoginUserDto } from '../dtos/login.request';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() user: LoginUserDto, @Res() res: Response) {
    try {
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'User logged in successfully',
        data: await this.authService.login(user),
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  }
  @Post('register')
  async register(@Body() user: CreateUserDto, @Res() res: Response) {
    try {
      return res.status(HttpStatus.OK).json({
        message: 'User created successfully',
        user: await this.authService.register(user),
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  }
}
