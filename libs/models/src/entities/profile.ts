
import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, VersionColumn, DeleteDateColumn} from 'typeorm';
import {Field, ID, ObjectType, registerEnumType} from 'type-graphql-v2-fork';
import { EditProfileInput } from '../inputs/profileInput';


export enum Gender {
  Male = "Male",
  Female = "Female",
}

registerEnumType(Gender, {
  name: "Gender"
});

@ObjectType()
@Entity()
export class Profile {
  constructor(data: EditProfileInput) {
    Object.assign(this, data);
  }

  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id:string;

  @Field({ nullable: false })
  @Column({ unique: true})
  displayName:string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  age: number;

  @Field(type => Gender, { nullable: true })
  @Column({ nullable: true })
  gender: Gender;

  @Field({ nullable: true })
  @Column({ nullable: true })
  city: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description: string;

  @Field(type => [Gender], { nullable: true })
  @Column({ type: 'simple-json', nullable: true })
  lookingFor: Gender[];

  /*
  profileImage: Media;
  publicImages: Media[];
  privateImages: Media[];
  */

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @VersionColumn()
  version: number;

  @DeleteDateColumn()
  deletedAt: Date;
}
