import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupCredentials } from './DTO/Signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  private Logger = new Logger('Auth Controller');
  @Post('/signup')
  signup(@Body() creds: SignupCredentials) {
    this.Logger.log(`${creds} Arrived`);

    return this.authService.signUp(creds);
  }
}
