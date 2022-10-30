import { Field, InputType } from "type-graphql-v2-fork";
import { Gender, Profile } from "../entities/profile";

@InputType()
export class EditProfileInput implements Partial<Profile> {
  @Field({ nullable: false })
  displayName: string;

  @Field({ nullable: true })
  age?: number;

  @Field(type => Gender, { nullable: true })
  gender?: Gender;

  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(type => [Gender], { nullable: true })
  lookingFor?: Gender[];
}
