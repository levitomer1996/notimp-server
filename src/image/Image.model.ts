import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
class ImageFile {
  data: Buffer;
  contentType: string;
}
@Schema()
export class ImageApi extends Document {
  @Prop({ required: true })
  name: string;
  @Prop({ default: { data: null, contentType: null } })
  image_file: ImageFile;
}

export const ImageApiSchema = SchemaFactory.createForClass(ImageApi);
