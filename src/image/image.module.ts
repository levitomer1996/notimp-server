import { HttpException, HttpStatus, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { extname } from 'path';
import { ImageController } from './image.controller';
import { ImageApi, ImageApiSchema } from './Image.model';
import { ImageService } from './image.service';

const imageFilter = function(req, file, cb) {
  // accept image only
  console.log(file);
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    cb(
      new HttpException(
        `Unsupported file type ${extname(file.originalname)}`,
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  }
  cb(null, true);
};

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ImageApi.name, schema: ImageApiSchema },
    ]),
    MulterModule.registerAsync({
      useFactory: () => ({
        fileFilter: imageFilter,
      }),
    }),
  ],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
