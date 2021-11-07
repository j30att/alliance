import { Crud, CrudController } from '@nestjsx/crud';
import { UserService } from './user.service';
import {Controller} from '@nestjs/common';
import { User } from './user.entity';

@Crud({
  model: {
    type: User
  }
})
@Controller('users')
export class UserController implements CrudController<User>{
  constructor(public service: UserService){}
}
