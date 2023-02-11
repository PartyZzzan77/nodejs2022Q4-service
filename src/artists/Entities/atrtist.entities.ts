import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsUUID } from 'class-validator';
import { Track } from '../../tracks/Entities/track.entitie';

@Entity({ name: 'artists' })
export class Artist {
  @ApiProperty({ example: '97c8d54a-b5e4-4a71-90b6-3786a5bbc094' })
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @ApiProperty({ example: 'Prodigy' })
  @Column({ nullable: true })
  name: string;

  @ApiProperty({ example: true })
  @Column({ nullable: true })
  grammy: boolean;

  @OneToMany(() => Track, (track: Track) => track.artistId, {
    onDelete: 'SET NULL',
  })
  tracks: Track[];
}
