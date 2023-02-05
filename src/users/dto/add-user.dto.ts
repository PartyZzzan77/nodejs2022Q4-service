import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddUserDto {
  @ApiProperty({ default: 'Jimmy Roquai' })
  @IsString()
  login: string;

  @ApiProperty({ default: '12345678' })
  @IsString()
  password: string;
}
