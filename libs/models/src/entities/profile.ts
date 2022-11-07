export enum Gender {
  Male = "Male",
  Female = "Female",
}

export interface Location {
  lat: number;
  lng: number;
  name: string;
}

export interface Profile {
  id:string;
  displayName:string;
  age: number;
  gender: Gender;
  city: string;
  location: Location;
  description: string;
  lookingFor: Gender[];
}
