import { IsNumber, IsOptional, IsString } from 'class-validator';

export class AddAlbumDto {
  @IsString()
  name: string;
  @IsNumber()
  year: number;
  @IsOptional()
  @IsString()
  artistId?: string;
}
