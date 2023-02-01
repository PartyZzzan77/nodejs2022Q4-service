import { IsUUID } from 'class-validator';

export class TrackDtoId {
  @IsUUID()
  id: string;
}
