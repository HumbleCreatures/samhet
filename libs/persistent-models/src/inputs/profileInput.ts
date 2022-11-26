import { Field, InputType } from "type-graphql-v2-fork";
import { Gender, Location as LocationInterface, EditProfileInput as EditProfileInputInterface } from '@samhet/models';


@InputType()
export class LocationInput implements LocationInterface  {
  @Field({ nullable: false })
  lat: number;
  @Field({ nullable: false })
  lng: number;
  @Field({ nullable: false })
  name: string;
}

@InputType()
export class EditProfileInput implements EditProfileInputInterface {
  @Field({ nullable: false })
  displayName: string;

  @Field({ nullable: true })
  age?: number;

  @Field(type => Gender, { nullable: true })
  gender?: Gender;

  @Field({ nullable: true })
  city?: string;

  @Field(type => LocationInput,{ nullable: true })
  location?: LocationInterface;

  @Field({ nullable: true })
  description?: string;

  @Field(type => [Gender], { nullable: true })
  lookingFor: Gender[];
}

