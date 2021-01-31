import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { userInfo } from 'os';
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
    const { reciver, content, title, sender_display_name } = body;
    return this.mailService.newMail({
      sender: _id,
      reciver,
      content,
      title,
      sender_display_name,
    });
  }
  @Get('usermail')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  getUserMail(@GetUser() user): Promise<Mail[]> {
    const { _id } = user;
    console.log(_id);
    return this.mailService.getUserMail(_id);
  }
  @Patch('updateisreaded')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  updateIsReader(@Body() body) {
    const { mailId } = body;
    return this.mailService.updateIsReaded(mailId);
  }
}
