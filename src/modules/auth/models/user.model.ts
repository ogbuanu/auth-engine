import { $Enums, Prisma } from '@prisma/client';

export class User implements Prisma.UserCreateInput {
  id?: string;
  first_name: string;
  last_name?: string;
  business_name?: string;
  legal_business_name?: string;
  email: string;
  password: string;
  account_mode?: $Enums.AccountMode;
  account_type?: $Enums.AccountType;
  created_at?: Date;
  updated_at?: Date;
}
