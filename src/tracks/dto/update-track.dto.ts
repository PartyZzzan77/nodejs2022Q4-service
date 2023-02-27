import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTrackDto {
  @ApiProperty({ default: 'Cosmic Girl radio edit' })
  @IsString()
  name: string;

  @ApiProperty({ default: null })
  @IsOptional()
  @IsString()
  artistId: string;

  @ApiProperty({ default: null })
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  albumId: string;

  @ApiProperty({ default: 207 })
  @IsNumber()
  duration: number;
}
