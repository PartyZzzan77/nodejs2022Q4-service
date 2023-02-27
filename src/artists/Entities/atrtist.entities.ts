import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsBoolean, IsString, IsUUID } from 'class-validator';
import { Track } from '../../tracks/Entities/track.entitie';
import { Album } from '../../albums/Entities/album.entities';

@Entity({ name: 'artists' })
export class Artist {
  @ApiProperty({ example: '97c8d54a-b5e4-4a71-90b6-3786a5bbc094' })
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @ApiProperty({ example: 'Prodigy' })
  @IsString()
  @Column({ nullable: true })
  name: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  @Column({ nullable: true })
  grammy: boolean;

  @OneToMany(() => Album, (album) => album.artist)
  albums: Album[];

  @OneToMany(() => Track, (track: Track) => track.artistId, {
    onDelete: 'SET NULL',
  })
  tracks: Track[];
}
