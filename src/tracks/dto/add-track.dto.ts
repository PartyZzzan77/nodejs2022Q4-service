import { IsNumber, IsOptional, IsString } from 'class-validator';

export class AddTrackDto {
  @IsString()
  name: string;
  @IsNumber()
  duration: number;
  @IsOptional()
  @IsString()
  artistId?: null;
  @IsOptional()
  @IsString()
  albumId?: null;
}
