import { IsNumber, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Album } from '../../albums/Entities/album.entities';
import { Artist } from '../../artists/Entities/atrtist.entities';

@Entity({ name: 'tracks' })
export class Track {
  @ApiProperty({ example: 'd9683e62-ce01-4ac4-80c7-23828cd13792' })
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  @IsString({ each: true })
  id: string;

  @ApiProperty({ example: 'Breathe' })
  @IsString()
  @Column({ nullable: true })
  name: string;

  @ApiProperty({ example: 214 })
  @IsNumber()
  @Column({ nullable: true })
  duration: number;

  @ApiProperty({ example: '97c8d54a-b5e4-4a71-90b6-3786a5bbc094' })
  @Column({ nullable: true })
  artistId?: string;

  @ApiProperty({ example: '10c8d54a-v5e4-5a71-90b6-3786a5cec073' })
  @Column({ nullable: true })
  albumId?: string;

  @ManyToOne(() => Album, (album: Album) => album.tracks, {
    onDelete: 'SET NULL',
  })
  album: Album[];

  @ManyToOne(() => Artist, (artist: Artist) => artist.tracks, {
    onDelete: 'SET NULL',
  })
  artist: Artist[];
}
