import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AddAlbumDto {
  @ApiProperty({ default: 'Dynamite' })
  @IsString()
  name: string;

  @ApiProperty({ default: 2005 })
  @IsNumber()
  year: number;

  @ApiProperty()
  @ApiPropertyOptional({ default: null })
  @IsOptional()
  @IsString()
  artistId?: string;
}
