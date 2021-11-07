import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()

export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  password: string

  @Column({unique: true})
  email: string

  @Column()
  phone: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  patronymic: string

  @Column()
  organization: string

  @Column()
  position: string

  @Column()
  avatar: string

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
