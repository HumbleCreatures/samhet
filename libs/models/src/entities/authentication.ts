
import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn} from 'typeorm';

@Entity()
export class Authentication {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  authenticationId: string;
  @Column()
  authenticationName: string;
  @Column()
  profileId: string;
  @CreateDateColumn()
  createdAt: Date;
}
