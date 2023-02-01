import { Injectable, NotFoundException } from '@nestjs/common';
import { Album } from './Entities/album.entities';
import { db } from '../DB/db.service';
import { Constants } from '../constants';
import { v4 as uuid4 } from 'uuid';
import { AddAlbumDto } from './dto/add-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumsService {
  private albums: Album[] = db.albums;
  public getAllAlbums(): Album[] {
    return this.albums;
  }
  public getOneAlbum(id: string): Album {
    const album = this.albums.find((album) => album.id === id);

    if (!album) {
      throw new NotFoundException(Constants.ALBUM_ERROR);
    }

    return album;
  }
  public addAlbum(albumData: AddAlbumDto): Album {
    const newAlbum = {
      id: uuid4(),
      ...albumData,
    };

    this.albums.push(newAlbum);

    return newAlbum;
  }
  public deleteAlbum(id: string): string {
    const album = this.getOneAlbum(id);
    this.albums = this.albums.filter((album) => album.id !== id);

    db.tracks.forEach((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
    });

    return album.id;
  }

  public updateAlbum(id: string, updateAlbumData: UpdateAlbumDto): Album {
    const album = this.getOneAlbum(id);
    this.deleteAlbum(id);
    const updatedAlbum = { ...album, ...updateAlbumData };
    this.albums.push(updatedAlbum);

    return updatedAlbum;
  }
}
