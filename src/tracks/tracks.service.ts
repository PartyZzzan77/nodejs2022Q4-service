import { Injectable, NotFoundException } from '@nestjs/common';
import { Track } from './Entities/track.entitie';
import { Constants } from '../constants';
import { v4 as uuid4 } from 'uuid';
import { AddTrackDto } from './dto/add-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { db } from '../DB/db.service';

@Injectable()
export class TracksService {
  public getAllTracks(): Track[] {
    return db.tracks;
  }
  public getOneTrack(id: string): Track {
    const track = db.tracks.find((track) => track.id === id);

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

    db.tracks.push(newTrack);

    return newTrack;
  }
  public deleteTrack(id: string): string {
    const track = this.getOneTrack(id);
    db.tracks = db.tracks.filter((track) => track.id !== id);
    db.favorites.tracks = db.favorites.tracks.filter((t) => t.id !== track.id);
    return track.id;
  }
  public updateTrack(id: string, updateTrackData: UpdateTrackDto): Track {
    const track = this.getOneTrack(id);
    this.deleteTrack(id);
    const updatedTrack = { ...track, ...updateTrackData };
    db.tracks.push(updatedTrack);

    return updatedTrack;
  }
}
