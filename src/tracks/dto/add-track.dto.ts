import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddTrackDto {
  @ApiProperty()
  @IsString()
  name: string;
  @IsNumber()
  @ApiProperty()
  duration: number;

  @IsOptional()
  @IsString()
  artistId?: null;

  @IsOptional()
  @IsString()
  albumId?: null;
}
