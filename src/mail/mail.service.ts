import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { AppGateWay } from '../app.gateway';
import { User } from '../auth/user.schema';
import NewMail from './DTO/NewMail.dto';
import { Mail } from './mail.schema';

@Injectable()
export class MailService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Mail.name) private mailModel: Model<Mail>,
    @InjectConnection() private connection: Connection,
  ) {}

  async newMail(newMail: NewMail) {
    const mail = new this.mailModel(newMail);
    mail.time_posted = Date.now();
    try {
      await mail.save();
    } catch (error) {
      throw new Error('Something went wrong');
    }
  }
  async getUserMail(id: string): Promise<Mail[]> {
    try {
      const list = await this.mailModel.find({ reciver: id, isReaded: false });

      return list;
    } catch (error) {
      throw new Error('Something went wrong');
    }
  }
  async updateIsReaded(mailId: string) {
    try {
      await this.mailModel.findByIdAndUpdate(mailId, { isReaded: true });
    } catch (error) {
      throw new Error('Something went wrong');
    }
  }
}
