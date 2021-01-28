import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  uploadFile(@UploadedFile() file) {
    return this.fileService.uploadFile(file);
  }
  @Get(':imgpath')
  seeUploadedFiles(@Param('imgpath') img, @Res() res) {
    res.sendFile(img, { root: './uploads/71cc180673121574e073db3df43b61a8' });
  }
}
