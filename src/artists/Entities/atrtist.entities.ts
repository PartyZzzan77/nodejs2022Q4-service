import { ApiProperty } from '@nestjs/swagger';

export class Artist {
  @ApiProperty({ example: '97c8d54a-b5e4-4a71-90b6-3786a5bbc094' })
  id: string;

  @ApiProperty({ example: 'Prodigy' })
  name: string;

  @ApiProperty({ example: true })
  grammy: boolean;
}
