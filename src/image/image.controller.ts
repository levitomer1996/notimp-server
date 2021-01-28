import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileURLToPath } from 'url';
import { ImageApi } from './Image.model';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile() file,
    @Res() res,
    @Req() req,
    @Body() body,
  ) {
    console.log(file);
    return this.imageService.create(file, body);
  }
  @Get('')
  async getPhotos(): Promise<ImageApi[]> {
    return this.imageService.findAll();
  }
  @Get(':id')
  async GetImageById(@Res() res, @Body() Body, @Param('id') id) {
    const image = await this.imageService.getById(id);
    res.setHeader('Content-Type', image.image_file.contentType);
    return res.send(image.image_file.data.buffer);
  }
}
