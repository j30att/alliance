import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Request } from './request.entity';
import { RequestService } from './request.service';


@Crud({
  model: {
    type: Request
  }
})

@Controller('request')
export class RequestController implements CrudController<Request>{
  constructor(public service: RequestService) {
  }
}
