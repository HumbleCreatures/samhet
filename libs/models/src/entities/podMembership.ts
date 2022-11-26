import { Pod } from "./pod";
import { Profile } from "./profile";

export enum PodMemberStatus {
  Primary,
  Secondary,
}

export enum MembershipType {
  Invite,
  Algorithm,
}

export class PodMember {
  id: string;
  profile: Profile;
  createdAt: Date;
  updatedAt: Date;
  status: PodMemberStatus;
  membershipType: MembershipType;
  pod: Pod;
}
