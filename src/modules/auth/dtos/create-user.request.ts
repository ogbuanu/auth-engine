import { $Enums } from '@prisma/client';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  first_name?: string;

  @IsString()
  last_name?: string;

  @IsString()
  title?: string;

  @IsString()
  business_name?: string;
  @IsString()
  legal_business_name?: string;

  @IsString()
  account_type?: $Enums.AccountType;

  @IsStrongPassword()
  @IsNotEmpty()
  @Length(6)
  password: string;
}
