import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { Mail } from './mail.schema';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private mailService: MailService) {}

  @Post('new')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  newMessage(@GetUser() user, @Body() body) {
    const { _id } = user;
    const { reciver, content, title } = body;
    console.log(user);
    return this.mailService.newMail({ sender: _id, reciver, content, title });
  }
  @Get('usermail')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  getUserMail(@GetUser() user): Promise<Mail[]> {
    const { _id } = user;
    return this.mailService.getUserMail(_id);
  }
}
