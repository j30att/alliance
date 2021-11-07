import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()

export class Upload {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  type: string

  @Column('text')
  file: string

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
