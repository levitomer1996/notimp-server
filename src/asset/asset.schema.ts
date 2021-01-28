import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ImageApi } from '../image/Image.model';
import { Country } from './countries.enum';

class Coordinates {
  latitude: number;
  longitude: number;
}
class Rate {
  rate_number: Number;
  uid: string;
}

@Schema()
export class Asset extends Document {
  @Prop({ required: true })
  uid: string;
  @Prop({ required: true })
  owner: string;
  @Prop({ required: true })
  rate: Rate;
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  location: Coordinates;
  @Prop({ required: true })
  location_name: string;
  @Prop({ required: true })
  price: number;
  @Prop({ required: true })
  floor: number;
  @Prop({ required: true })
  isBalcony: boolean;
  @Prop({ required: true })
  isFurnished: boolean;
  @Prop({ required: true })
  isPets: boolean;
  @Prop({ required: true })
  isAirConditioned: boolean;
  @Prop({ required: true })
  time_Posted: number;
  @Prop({})
  user_photo: string;
  @Prop({ required: true })
  country: Country;
  @Prop({ required: true })
  adress: string;
}

export const AssetSchema = SchemaFactory.createForClass(Asset);
