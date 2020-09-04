import { Controller, Post, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('files')

export class FilesController {

  @Post()
  @UseInterceptors(FilesInterceptor('files', 10, {
    limits:{
      fileSize: 1024 * 1024
    }
  }))
  uploadFile(@UploadedFiles() files) {
    console.log(files);
  }
}
