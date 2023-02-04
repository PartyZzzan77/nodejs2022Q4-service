import { ApiProperty } from '@nestjs/swagger';

export class Album {
  @ApiProperty({ example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' })
  id: string;
  @ApiProperty({ example: 'Music for the Jilted Generation' })
  name: string;

  @ApiProperty({ example: 1994 })
  year: number;

  @ApiProperty({ example: 'd2992f19-7cac-4a86-9b3d-9d143a42b66d' })
  artistId?: string;
}
