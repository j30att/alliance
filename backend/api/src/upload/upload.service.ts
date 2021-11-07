import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Upload } from './upload.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UploadService extends TypeOrmCrudService<Upload>{
  constructor(@InjectRepository(Upload) uploadRepository: Repository<Upload>) {
    super(uploadRepository);
  }
}
