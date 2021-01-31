import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Mail extends Document {
  @Prop({ required: true })
  sender: string;
  @Prop({ required: true })
  sender_display_name: string;
  @Prop({ required: true })
  reciver: string;
  @Prop({ required: true })
  content: string;
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  time_posted: number;
  @Prop({ default: false })
  isReaded: boolean;
}

export const MailSchema = SchemaFactory.createForClass(Mail);
