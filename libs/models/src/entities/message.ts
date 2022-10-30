import { Media } from "./media";
import { Profile } from "./entities";

enum MessageStatus {
  Created,
  Deleted
}

export class Message {
  id: number;
  conversationId: number;
  author: Profile;
  status: MessageStatus;
  message: string;
  images: Media[];
}
