
import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, VersionColumn, DeleteDateColumn} from 'typeorm';
import {Field, ID, ObjectType, registerEnumType} from 'type-graphql-v2-fork';
import { EditProfileInput } from '../inputs/profileInput';
import { Gender, Location, Profile as ProfileInterface } from '@samhet/models';

registerEnumType(Gender, {
  name: "Gender"
});

@ObjectType()
export class LocationType implements Location  {
  @Field({ nullable: false })
  lat: number;
  @Field({ nullable: false })
  lng: number;
  @Field({ nullable: false })
  name: string;
}

@ObjectType()
@Entity()
export class Profile implements ProfileInterface {
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
  @Column({
    type: "enum",
    enum: Gender,
    default: Gender.Male,
    nullable: true
  })
  gender: Gender;

  @Field({ nullable: true })
  @Column({ nullable: true })
  city: string;

  @Field(type => LocationType, { nullable: true })
  @Column({ type: 'simple-json', nullable: true })
  location: Location;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description: string;

  @Field(type => [Gender], { nullable: true })
  @Column({ type: 'simple-json', nullable: true })
  lookingFor: Gender[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @VersionColumn()
  version: number;

  @DeleteDateColumn()
  deletedAt: Date;
}
