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
    location {
      lat
      lng
      name
    }
    id
  }
}
`;

export interface MyProfilesData { myProfiles: Profile[]; }
export interface ProfileQuery { allProfiles: Profile[]; }


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


export const ALL_PROFILES = gql`query Query {
  allProfiles {
    id
    displayName
    age
    gender
    city
  }
}`

export const PROFILE_BY_DISPLAY_NAME = gql`query ProfileByDisplayName($displayName: String!) {
  profileByDisplayName(displayName: $displayName) {
    id
    displayName
    age
    gender
    city
    description
  }
}`


export interface ProfileByDisplayNameQuery { profileByDisplayName: Profile | undefined; }
