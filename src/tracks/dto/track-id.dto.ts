import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TrackDtoId {
  @ApiProperty()
  @IsUUID()
  id: string;
}
