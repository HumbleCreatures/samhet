import { gql } from "@apollo/client";
import { Profile } from "@samhet/models";

export const GET_MY_PROFILES = gql`
query MyProfiles {
  myProfiles {
    age
    gender
    displayName
    city
    description
    lookingFor
    id
  }
}
`;

export interface MyProfilesData { myProfiles: Profile[]; }


export const CREATE_PROFILE = gql`mutation CreateProfile($profile: EditProfileInput!) {
  createProfile(profile: $profile) {
    displayName
    age
    gender
    city
  ,
  }
}`

export const UPDATE_PROFILE = gql`mutation Mutation($profile: EditProfileInput!) {
  updateProfile(profile: $profile) {
    displayName
    age
    gender
    city
  }
}`
