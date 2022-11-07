import { Profile } from "./profile";

export enum PodMemberStatus {
  Primary,
  Secondary,
  Left,
}
export class PodMember {
  id: number;
  podId: number;
  profile: Profile;
  createdAt: Date;
  updatedAt: Date;
  status: PodMemberStatus;
}
