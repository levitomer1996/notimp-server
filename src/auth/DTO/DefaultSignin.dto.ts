import { IsEmail } from 'class-validator';
export class DefaultSignInCredentials {
  @IsEmail()
  email: string;
  password: string;
}
