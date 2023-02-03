import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Track {
  @ApiProperty()
  @IsUUID()
  @IsString({ each: true })
  id: string;
  name: string;
  artistId?: string;
  albumId?: string;
  duration: number;
}
