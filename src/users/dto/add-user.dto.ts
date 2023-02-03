import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddUserDto {
  @ApiProperty()
  @IsString()
  login: string;

  @ApiProperty()
  @IsString()
  password: string;
}
