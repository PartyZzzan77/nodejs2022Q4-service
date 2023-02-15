import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsUUID } from 'class-validator';
import { Track } from '../../tracks/Entities/track.entitie';

@Entity({ name: 'albums' })
export class Album {
  @ApiProperty({ example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' })
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @ApiProperty({ example: 'Music for the Jilted Generation' })
  @Column({ nullable: true })
  name: string;

  @ApiProperty({ example: 1994 })
  @Column({ nullable: true })
  year: number;

  @ApiProperty({ example: 'd2992f19-7cac-4a86-9b3d-9d143a42b66d' })
  @Column({ nullable: true })
  artistId?: string;
  @OneToMany(() => Track, (track: Track) => track.albumId, {
    onDelete: 'SET NULL',
  })
  tracks: Track[];
}
