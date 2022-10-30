import { Profile } from "./profile";

export enum ConnectionStatus {
  Initiated,
  Accepted,
  Declined,
  Ignored,
  CanceledByInitiator,
  CanceledByTarget
}
export type ConnectionHistory = {
  createdAt: Date,
  by: Profile,
  status: ConnectionStatus
}
export class Connection {
  initiator: Profile;
  target: Profile;
  initiatorMessage: string;
  createdAt: Date;
  lastUpdated: Date;
  status: ConnectionStatus;
  history: ConnectionHistory[];
  conversationId: number;
}
