import { Media } from "./media";

export enum Gender {
  Male,
  Female,
  Other,
}
export class Profile {
  id:number;
  displayName:string;
  age: number;
  gender: Gender;
  city: string;
  selfDescription: string;
  lookingFor: string;
  profileImage: Media;
  publicImages: Media[];
  privateImages: Media[];
}
