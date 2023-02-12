import { Artist } from '../../artists/Entities/atrtist.entities';
import { Album } from '../../albums/Entities/album.entities';
import { Track } from '../../tracks/Entities/track.entitie';
import { ApiProperty } from '@nestjs/swagger';
import { Constants } from '../../constants';
import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'favorites' })
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

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
  @ManyToMany(() => Track)
  @JoinTable()
  tracks: Track[];

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
  @ManyToMany(() => Album)
  @JoinTable()
  albums: Album[];

  @ApiProperty({
    default: [
      {
        id: '97c8d54a-b5e4-4a71-90b6-3786a5bbc094',
        name: 'Prodigy',
        grammy: true,
      },
    ],
  })
  @ManyToMany(() => Artist)
  @JoinTable()
  artists: Artist[];
}

export class ResponseFav {
  @ApiProperty({ example: { message: Constants.TRACK_SUCCESS } })
  message: string;
}
