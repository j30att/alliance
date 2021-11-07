import { IsNotEmpty } from 'class-validator';

export class NotificationDTO {
  id:number
  @IsNotEmpty()
  time: Date
  @IsNotEmpty()
  message: string
  @IsNotEmpty()
  status: string
  @IsNotEmpty()
  type: string

  requestCategory: string
  requestType: string
  requestNumber:number | null
}
