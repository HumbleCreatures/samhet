import { Field, ID, ObjectType } from "type-graphql-v2-fork";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PodMember } from "./podMember";
import { Pod as PodInterface, PodMember as PodMemberInterface } from "@samhet/models";

@ObjectType()
@Entity()
export class Pod implements PodInterface {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ nullable: true })
  @Column()
  displayName: string;

  @OneToMany(() => PodMember, (member) => member.pod)
  @Field(type => PodMember, { nullable: false })
  members: PodMemberInterface[];

  @Column({default: false})
  deleted: boolean;
}
