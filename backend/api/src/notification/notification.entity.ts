import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum NotificationType {
  TYPE_ALERT    = 'alert',
  TYPE_INFO     = 'info',
  TYPE_WARNING  = 'warning',
}

export enum NotificationStatus {
  STATUS_READ   = 'read',
  STATUS_UNREAD = 'unread',
}

export enum RequestCategory {
  CATEGORY_GLONASS    = 'glonass',
  CATEGORY_TACHOGRAPH =  'tachograph'
}

export enum RequestType {
  TYPE_INSTALL                = 'install',
  TYPE_SERVICE                = 'service',
  TYPE_CALIBRATION            = 'calibration',
  TYPE_CHANGE_SKZI            = 'changeSKZI',
  TYPE_METROLOGICAL_VERIFY    = 'metrologicalVerify',
  TYPE_SKZI_DRIVER_CARD       = 'SKZIDriverCard',
  TYPE_ESTR_DRIVER_CARD       = 'ESTRDriverCard',
  TYPE_SKZI_ORGANIZATION_CARD = 'SKZIOrganizationCard',
  TYPE_ESTR_ORGANIZATION_CARD = 'ESTROrganizationCard',
}

@Entity()

export class Notification {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
      default: null,
      nullable: true
    })
  time: Date

  @Column('text')
  message: string

  @Column({
    type: 'enum',
    enum: NotificationStatus,
    default: NotificationStatus.STATUS_UNREAD,
  })
  status: string

  @Column({
    type: 'enum',
    enum: NotificationType,
    default: NotificationType.TYPE_INFO,
  })
  type : string

  @Column({
    type: 'enum',
    enum: RequestCategory,
    default: null,
    nullable: true
  })
  requestCategory: string

  @Column({
    type: 'enum',
    enum: RequestType,
    default: null,
    nullable: true
  })
  requestType: string

  @Column({nullable: true})
  requestNumber: number


  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
