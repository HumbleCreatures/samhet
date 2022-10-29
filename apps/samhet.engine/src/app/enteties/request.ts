import { Media } from "./media";
import { Gender, Profile } from "./profile";

enum LookingFor {
  Male,
  Female,
  Event,
}

export class Request {
  id: number;
  requester: Profile;
  createdAt: Date;
  end: Date;
  message: string;
  media: Media[];
  as: LookingFor;
  lookingFor: LookingFor;
  locations: string[];
  ageMin: number;
  ageMax: number;
}
