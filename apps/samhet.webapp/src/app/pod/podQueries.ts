import { gql } from "@apollo/client";
import { Pod, PodMember } from "@samhet/models";

export const MY_PODS = gql`
query MyPodMemberships {
    myPodMemberships {
      createdAt
      id
      pod {
        id
        displayName
      }
    }
  }
`;

export interface MyPodsMemberData { myPodMemberships: PodMember[]; }

export const GENERATE_POD = gql`mutation Mutation {
    generatePod {
      id
    }
  }
`

export const GET_POD = gql`
query Query($getPodId: String!) {
    getPod(id: $getPodId) {
      displayName
      id
      members {
        id
        profile {
          displayName
          id
          gender
          age
        }
      }
    }
  }
`;
export interface GetPodData { getPod: Pod; }
