import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddUserDto {
  @ApiProperty({ default: 'Jimmy Roquai' })
  @MinLength(2)
  @IsString()
  login: string;

  @ApiProperty({ default: '12345678' })
  @MinLength(2)
  @IsString()
  password: string;
}
