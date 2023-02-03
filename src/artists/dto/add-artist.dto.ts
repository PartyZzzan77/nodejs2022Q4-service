import { IsBoolean, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddArtistDto {
  @ApiProperty({ default: 'Jamiroquai' })
  @IsString()
  name: string;

  @ApiProperty({ default: true })
  @IsBoolean()
  grammy: boolean;
}
