import { Artist } from '../../artists/Entities/atrtist.entities';
import { Album } from '../../albums/Entities/album.entities';
import { Track } from '../../tracks/Entities/track.entitie';
import { ApiProperty } from '@nestjs/swagger';
import { Constants } from '../../constants';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'favorites' })
export class Favorite {
  @PrimaryColumn('numeric', { default: 1 })
  id?: number;

  @ApiProperty({
    default: [
      {
        id: '97c8d54a-b5e4-4a71-90b6-3786a5bbc094',
        name: 'Prodigy',
        grammy: true,
      },
    ],
  })
  @Column('text', { array: true, default: [] })
  artists: Artist[];

  @ApiProperty({
    example: [
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'Innuendo',
        year: 1991,
        artistId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      },
    ],
  })
  @Column('text', { array: true, default: [] })
  albums: Album[];

  @ApiProperty({
    example: [
      {
        id: 'd9683e62-ce01-4ac4-80c7-23828cd13792',
        name: 'breathe',
        duration: 214,
        artistId: '97c8d54a-b5e4-4a71-90b6-3786a5bbc094',
        albumId: null,
      },
    ],
  })
  @Column('text', { array: true, default: [] })
  tracks: Track[];
}

export class ResponseFav {
  @ApiProperty({ example: { message: Constants.TRACK_SUCCESS } })
  message: string;
}
