import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';


@Injectable()
export class UserService extends TypeOrmCrudService<User>{
  constructor(@InjectRepository(User) private userRepository: Repository<User>){
    super(userRepository);
  }

  async create(data: UserDto[]) {
    return await this.userRepository.save(data)
  }

  async getUser(param: string): Promise<User | undefined> {
    return await this.userRepository.findOne({email:param});
  }
}
