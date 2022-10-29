import { Profile } from "./profile";

export enum ReportType {
  ExplicitContent,
  Harassment,
  Threats,
  Unsolicited,
  NotContentOwner,
}

export class Report {
  id: number;
  podId?: number;
  reporter: Profile;
  perpetrator: Profile;
  messageId: number;
  imageId: number;
  reason: string;
}
