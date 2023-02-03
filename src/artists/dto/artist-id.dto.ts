import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ArtistDtoId {
  @ApiProperty()
  @IsUUID()
  id: string;
}
