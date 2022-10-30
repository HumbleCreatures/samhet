import { Profile } from "./entities"
export enum ParticipationStatus {
  Joined,
  Left,
}
export type ConversationParticipant = {
  id: number,
  createdAt: Date,
  profile: Profile,
  participationStatus: ParticipationStatus
}
export class Conversation {
  id: number;
  createdAt:Date;
  participants: ConversationParticipant [];
}
