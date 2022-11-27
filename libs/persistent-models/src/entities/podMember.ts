
import { MembershipType, Pod as PodInterface, PodMember as PodMemberInterface, PodMemberStatus, Profile as ProfileInterface } from "@samhet/models";
import { Field, ID, ObjectType, registerEnumType } from "type-graphql-v2-fork";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Pod } from "./pod";
import { Profile } from "./profile";

registerEnumType(MembershipType, {
  name: "MembershipType"
});

registerEnumType(PodMemberStatus, {
  name: "PodMemberStatus"
});

@ObjectType()
@Entity()
export class PodMember implements PodMemberInterface {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(type => Profile, { nullable: false })
  @ManyToOne(() => Profile, (profile) => profile.memberships)
  profile: ProfileInterface;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;
  @Column({
    type: "enum",
    enum: PodMemberStatus,
    default: PodMemberStatus.Primary,
    nullable: true
  })
  @Field(type => PodMemberStatus, { nullable: false })
  status: PodMemberStatus;
  @Column({
    type: "enum",
    enum: MembershipType,
    default: MembershipType.Algorithm,
    nullable: true
  })
  @Field(type => MembershipType, { nullable: false })
  membershipType: MembershipType;
  @Field(type => Pod, { nullable: false })
  @ManyToOne(() => Pod, (pod) => pod.members)
  pod: PodInterface;
}
