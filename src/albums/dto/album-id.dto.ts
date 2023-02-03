import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AlbumDtoId {
  @ApiProperty()
  @IsUUID()
  id: string;
}
