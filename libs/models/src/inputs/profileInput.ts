import { Gender, Location } from "../entities/profile";
export interface EditProfileInput {
  displayName: string;
  age?: number;
  gender?: Gender;
  city?: string;
  location?: Location;
  description?: string;
  lookingFor?: Gender[];
}

