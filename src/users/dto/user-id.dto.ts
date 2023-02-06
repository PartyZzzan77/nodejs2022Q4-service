import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserIdDto {
  @ApiProperty()
  @IsString()
  id: string;
}
