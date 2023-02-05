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

export class BadRequestUUID {
  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({ example: ['id must be a UUID'] })
  message: string[];

  ['"Bad Request"'];
  error: string;
}

export class Unprocessable {
  @ApiProperty({ example: 422 })
  statusCode: number;

  @ApiProperty({ example: 'Entity not found' })
  message: string;

  @ApiProperty({ example: 'Not Found' })
  error: string;
}

export class NotFound {
  @ApiProperty({ example: 404 })
  statusCode: number;

  @ApiProperty({ example: 'Entity not found' })
  message: string;

  @ApiProperty({ example: 'Not Found' })
  error: string;
}

export class Invalid {
  @ApiProperty({ example: 403 })
  statusCode: number;

  @ApiProperty({ example: 'Entity invalid' })
  message: string[];

  @ApiProperty({ example: 'Forbidden' })
  error: string;
}

export class RequiredFields {
  @ApiProperty({ example: 400 })
  'statusCode': number;

  @ApiProperty({ example: ['name must be a string'] })
  'message': string[];

  @ApiProperty({ example: 'Bad Request' })
  'error': string;
}
