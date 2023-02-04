import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Track {
  @ApiProperty({ example: 'd9683e62-ce01-4ac4-80c7-23828cd13792' })
  @IsUUID()
  @IsString({ each: true })
  id: string;

  @ApiProperty({ example: 'Breathe' })
  name: string;

  @ApiProperty({ example: '97c8d54a-b5e4-4a71-90b6-3786a5bbc094' })
  artistId?: string;

  @ApiProperty({ example: '10c8d54a-v5e4-5a71-90b6-3786a5cec073' })
  albumId?: string;

  @ApiProperty({ example: 214 })
  duration: number;
}
