import { Injectable, NotFoundException } from '@nestjs/common';
import { Track } from './Entities/track.entitie';
import { Constants } from '../constants';
import { v4 as uuid4 } from 'uuid';
import { AddTrackDto } from './dto/add-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TracksService {
  private tracks: Track[] = [];

  public getAllTracks(): Track[] {
    return this.tracks;
  }
  public getOneTrack(id: string): Track {
    const track = this.tracks.find((track) => track.id === id);

    if (!track) {
      throw new NotFoundException(Constants.TRACK_ERROR);
    }

    return track;
  }
  public addTrack(trackData: AddTrackDto): Track {
    const newTrack = {
      id: uuid4(),
      ...trackData,
    };

    this.tracks.push(newTrack);

    return newTrack;
  }
  public deleteTrack(id: string): string {
    const track = this.getOneTrack(id);
    this.tracks = this.tracks.filter((track) => track.id !== id);
    return track.id;
  }
  public updateTrack(id: string, updateTrackData: UpdateTrackDto): Track {
    const track = this.getOneTrack(id);
    this.deleteTrack(id);
    const updatedTrack = { ...track, ...updateTrackData };
    this.tracks.push(updatedTrack);

    return updatedTrack;
  }
}
