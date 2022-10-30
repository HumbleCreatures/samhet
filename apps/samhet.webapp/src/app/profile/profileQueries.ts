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
