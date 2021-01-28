import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import createImageDto from './DTO/createImage.dto';
import { ImageApi } from './Image.model';

@Injectable()
export class ImageService {
  constructor(
    @InjectModel(ImageApi.name) private imageModel: Model<ImageApi>,
    @InjectConnection() private connection: Connection,
  ) {}
  private logger = new Logger('Image-Service');
  async create(file, createImage: createImageDto) {
    const { name } = createImage;
    const newImage = new this.imageModel({
      name,
      image_file: { data: file.buffer, contentType: file.mimetype },
    });
    try {
      this.logger.log(`trying to save - ${newImage}`);
      await newImage.save();
      this.logger.log('New Image Saved... Returing to user');
    } catch (error) {
      this.logger.log(error);
    }
  }
  async findAll() {
    const list = await this.imageModel.find().exec();
    return list;
  }
  async getById(id) {
    return await this.imageModel.findById(id).exec();
  }
  async removeImage(id) {
    return this.imageModel.findByIdAndDelete(id);
  }
}
