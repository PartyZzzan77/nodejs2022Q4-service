import { IsUUID } from 'class-validator';

export class AlbumDtoId {
  @IsUUID()
  id: string;
}
