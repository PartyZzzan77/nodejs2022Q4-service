import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
export class User {
  @ApiProperty({
    example: 'd9683e62-ce01-4ac4-80c7-23828cd13792',
    description: 'unique identifier',
  })
  id: string;

  @ApiProperty({ example: 'User' })
  login: string;

  @Exclude()
  password: string;

  @ApiProperty({ example: '1' })
  version: number;

  @ApiProperty({ example: 1675540182719 })
  createdAt: number;

  @ApiProperty({ example: 1675540182719 })
  updatedAt: number;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
