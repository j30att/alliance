import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Crud, CrudController } from '@nestjsx/crud';
import { UploadService } from './upload.service';
import { Upload } from './upload.entity';
import { diskStorage } from 'multer';
import { FilesHelper } from '../common/helpers/files.helper';


@Crud({
  model: {
    type: Upload
  }
})

@Controller('upload')
export class UploadController implements CrudController<Upload> {
  constructor(public service: UploadService) {
  }

  @Post('/')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: FilesHelper.destinationPath,
      filename: FilesHelper.fileName
    })
  }))
  uploadFile(@UploadedFile() file, @Body('type') type) {
    return `/upload/${file.filename}`;
  }
}
