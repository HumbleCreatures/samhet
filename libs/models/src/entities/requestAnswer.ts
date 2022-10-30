import { Profile } from "./entities";

export class Answer {
  id: number;
  answerer: Profile;
  createdAt: Date;
  conversationId: number;
}
