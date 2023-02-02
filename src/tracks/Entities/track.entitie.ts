import { IsString, IsUUID } from 'class-validator';

export class Track {
  @IsUUID()
  @IsString()
  id: string;
  name: string;
  artistId?: string;
  albumId?: string;
  duration: number;
}
