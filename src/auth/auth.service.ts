import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { SignupCredentials } from './DTO/Signup.dto';
import { User } from './user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectConnection() private connection: Connection,
    private jwtService: JwtService,
  ) {}
  private logger = new Logger('Auth Service');
  async signUp(creds: SignupCredentials) {
    this.logger.log(creds.uid + ' Arrived');
    const newUser = new this.userModel({ _id: creds.uid });
    try {
      await newUser.save();
      this.logger.log('New user is created');
      return newUser;
    } catch (error) {}
  }
}
