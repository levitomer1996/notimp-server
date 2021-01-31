import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { DefaultSignInCredentials } from './DTO/DefaultSignin.dto';
import { SignupCredentials } from './DTO/Signup.dto';
import { JwtPayload } from './jwt-payload.interface';
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

  async google_signin(uid: string) {
    const foundUser = await this.userModel.findById(uid);
    if (!foundUser) {
      const newUser = new this.userModel({ _id: uid });
      await newUser.save();
      const payload: JwtPayload = {
        uid: newUser._id,
      };
      const accessToken = await this.jwtService.sign(payload);
      return accessToken;
    }
    const payload: JwtPayload = {
      uid: foundUser._id,
    };
    const accessToken = await this.jwtService.sign(payload);
    return accessToken;
  }

  async default_signin(uid: DefaultSignInCredentials) {
    const foundUser = await this.userModel.findById(uid);
    console.log(foundUser);
    if (!foundUser) {
      throw new BadRequestException();
    }
    const payload: JwtPayload = {
      uid: foundUser._id,
    };
    const accessToken = await this.jwtService.sign(payload);
    return accessToken;
  }
}
