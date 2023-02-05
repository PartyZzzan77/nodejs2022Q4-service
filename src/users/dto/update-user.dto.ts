import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ default: '12345678' })
  @IsString()
  oldPassword: string;

  @ApiProperty({ default: '87654321' })
  @IsString()
  newPassword: string;
}
