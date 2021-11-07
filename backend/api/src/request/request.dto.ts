import { IsNotEmpty } from 'class-validator';
import { RequestCategory, RequestStatus, RequestType } from './request.entity';

export class RequestDto{
  @IsNotEmpty()
  category:RequestCategory

  notificationNumber: number | null

  closeComment: string | null

  @IsNotEmpty()
  type:RequestType

  @IsNotEmpty()
  status:RequestStatus

  @IsNotEmpty()
  vehicle: string

  @IsNotEmpty()
  contractor: string

  @IsNotEmpty()
  worker: string

  @IsNotEmpty()
  description: string

  @IsNotEmpty()
  ended_at: Date

  @IsNotEmpty()
  created_at: Date

  @IsNotEmpty()
  body: {}
}
