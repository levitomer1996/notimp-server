import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninType } from './DTO/SigninType.enum';
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
  @Post('signin')
  signin(@Body() body) {
    const { signin_type, uid } = body;
    switch (signin_type) {
      case SigninType.DEFAULT:
        return this.authService.default_signin(uid);
      case SigninType.GOOGLE:
        return this.authService.google_signin(uid);
      default:
        break;
    }
  }
}
