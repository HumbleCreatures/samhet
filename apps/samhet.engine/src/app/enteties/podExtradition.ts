import { Profile } from "./profile";
enum ProspectInterest {
  Accepted,
  Declined,
}

enum Vote {
  Extradite,
  Keep,
  Abstain,
}


export type MemberVote = {
  createdAt: Date;
  vote: Vote;
}

export class podExtradition {
  id: number;
  podId: number;
  member: Profile;
  reason: string;
  instigator: Profile;
  createdAt: Date;
  updatedAt: Date;
  stepMemberVotes: MemberVote[];
}
