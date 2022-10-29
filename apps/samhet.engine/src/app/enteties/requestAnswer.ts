import { Profile } from "./profile";

export class Answer {
  id: number;
  answerer: Profile;
  createdAt: Date;
  conversationId: number;
}
