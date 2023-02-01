import { Injectable } from '@nestjs/common';
import { Album } from './Entities/album.entities';
import { db } from '../DB/db.service';

@Injectable()
export class AlbumsService {
  private albums: Album[] = db.albums;
  public getAllAlbums(): Album[] {
    return this.albums;
  }
}
