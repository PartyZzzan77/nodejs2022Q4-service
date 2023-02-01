import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  artistId: string;
  @IsOptional()
  @IsString()
  albumId: string;
  @IsNumber()
  duration: number;
}
