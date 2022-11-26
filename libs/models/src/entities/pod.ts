import { PodMember } from "./podMembership";

export class Pod {
  id: string;
  members: PodMember[];
  deleted: boolean;
}
