import { PodMember } from "./podMembership";

export class Pod {
  id: string;
  displayName: string;
  members: PodMember[];
  deleted: boolean;
}
