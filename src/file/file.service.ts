import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  uploadFile(image) {
    console.log(image);
  }
}
