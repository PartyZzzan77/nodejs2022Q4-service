import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AddTrackDto {
  @ApiProperty({ default: 'Cosmic Girl' })
  @IsString()
  name: string;

  @ApiProperty({ default: 241 })
  @IsNumber()
  duration: number;

  @ApiProperty({ type: AddTrackDto, default: null })
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  artistId?: null;

  @ApiProperty({ type: AddTrackDto, default: null })
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  albumId?: null;
}
