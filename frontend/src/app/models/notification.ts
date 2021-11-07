import { format, addSeconds, parse, parseISO} from 'date-fns';

export enum NotificationType {
  TYPE_ALERT    = 'alert',
  TYPE_INFO     = 'info',
  TYPE_WARNING  = 'warning',
}

export enum NotificationStatus {
  STATUS_READ   = 'read',
  STATUS_UNREAD = 'unread',
}

export class Notification {
  constructor(
    public id: number = 0,
    public created_at: string = '',
    public message: string = '',
    public status: string = '',
    public type: string = '',
    public requestCategory: string = null,
    public requestType: string = null,
    public requestNumber:number = null) {
  }

  public formattedDate() {
    // console.log('this.created_at', this.created_at)
    // let withoutT = `${this.created_at.substr(0, 10)} ${this.created_at.substr(11, 8)}Z`
    // let isoDate = parseISO(withoutT)
    // let formatted = format(isoDate, 'dd.MM.yyyy HH:mm')
    // let formatted = format(new Date(this.created_at), 'dd.MM.yyyy HH:mm')
    return new Date(this.created_at)
  }

  static fromJSON(d: Object): Notification {
    return Object.assign(new Notification(), d);
  }
}
