import { IsUUID } from 'class-validator';

export class ArtistDtoId {
  @IsUUID()
  id: string;
}
