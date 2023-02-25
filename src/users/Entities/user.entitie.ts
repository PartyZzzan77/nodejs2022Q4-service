import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { hash } from 'bcrypt';
import * as process from 'process';
import { IsNumber, IsString, IsUUID } from 'class-validator';

export const SALT = +process.env.CRYPT_SALT;
export const getTimestampInSeconds = () => Math.floor(Date.now() / 1000);
export const hasPassword = async (password: string) =>
  await hash(password, SALT);

@Entity({ name: 'users' })
export class User {
  @ApiProperty({
    example: 'd9683e62-ce01-4ac4-80c7-23828cd13792',
    description: 'unique identifier',
  })
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'User' })
  @IsString()
  @Column({ nullable: true })
  login: string;

  @Column()
  @Exclude()
  password: string;

  @ApiProperty({ example: '1' })
  @IsNumber()
  @Column({ default: 1 })
  version: number;

  @ApiProperty({ example: 1675540182719 })
  @IsNumber()
  @Column({ default: getTimestampInSeconds() })
  createdAt: number;

  @ApiProperty({ example: 1675540182719 })
  @IsNumber()
  @Column({ default: getTimestampInSeconds() })
  updatedAt: number;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hasPassword(`${this.password}`);
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
