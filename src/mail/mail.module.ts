import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { User, UserSchema } from '../auth/user.schema';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { Mail, MailSchema } from './mail.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Mail.name, schema: MailSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'tomer',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
