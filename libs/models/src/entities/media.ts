enum MediaType {
  Image,
  Video,
  GIF,
}
export class Media {
  id: string;
  url: string;
  xRated: boolean;
  profileId: number;
  type: MediaType;
}
