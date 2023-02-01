import { IsBoolean, IsString } from 'class-validator';

export class AddArtistDto {
  @IsString()
  name: string;
  @IsBoolean()
  grammy: boolean;
}
