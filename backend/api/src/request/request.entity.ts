import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum RequestCategory {
  CATEGORY_GLONASS    = 'glonass',
  CATEGORY_TACHOGRAPH = 'tachograph',
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

export enum RequestStatus {
  STATUS_NONE           = 'none',
  STATUS_NEW            = 'new',
  STATUS_ACTIVE         = 'active',
  STATUS_FINESED        = 'finished',
  STATUS_NOT_CONFIRMED  = 'notConfirmed',
  STATUS_NOT_REJECTED   = 'rejected'
}

@Entity()
export class Request {
  @PrimaryGeneratedColumn()
  id: string

  @Column({nullable: true})
  notificationNumber: number

  @Column({
    type: 'enum',
    enum: RequestCategory,
  })
  category:string

  @Column({
    type: 'enum',
    enum: RequestType,
  })
  type:string

  @Column({type:'enum', enum: RequestStatus, default: RequestStatus.STATUS_NEW})
  status:string

  @Column({type:'text'})
  vehicle: string

  @Column()
  contractor: string

  @Column()
  worker: string

  @Column({
    type: 'text'
  })
  description: string

  @Column("text",{nullable: true})
  closeComment: string

  @Column({
    nullable: true
  })
  ended_at: Date

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @Column({
    type: 'json',
    array: false,
    nullable: true,
  })
  body: {}
}
