import { Request } from './request.entity';
import { Injectable } from '@nestjs/common';
import { RequestDto } from './request.dto';

@Injectable()
export class RequestMapper {
  toRequestDTO(request: Request) {
    return {
      'created_at': request.created_at,
      'number': request.id,
      'contractor': request.contractor,
      'vehicle': request.vehicle,
      'status': request.status,
      'type': request.type,
      'category': request.category,
      'worker': request.worker,
      'description': request.description,
      'ended_at': request.ended_at,
      'body': request.body,
      'notificationNumber': request.notificationNumber,
      'closeComment': request.closeComment,
    } as RequestDto
  }
}
