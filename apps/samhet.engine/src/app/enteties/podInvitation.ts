import { Profile } from "./profile";
enum ProspectInterest {
  Accepted,
  Declined,
}

enum Vote {
  Accepted,
  Declined,
  Abstained,
}
export type StepProspectInterest = {
  createdAt: Date;
  interest: ProspectInterest;
}


export type MemberVote = {
  createdAt: Date;
  vote: Vote;
}


export class podInvitation {
  id: number;
  podId: number;
  prospect: Profile;
  inviter: Profile;
  createdAt: Date;
  updatedAt: Date;
  stepProspectInterest: StepProspectInterest;
  stepMemberVotes: MemberVote[];
}
