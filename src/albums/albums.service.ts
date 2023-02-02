import { Injectable, NotFoundException } from '@nestjs/common';
import { Album } from './Entities/album.entities';
import { db } from '../DB/db.service';
import { Constants } from '../constants';
import { v4 as uuid4 } from 'uuid';
import { AddAlbumDto } from './dto/add-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumsService {
  public getAllAlbums(): Album[] {
    return db.albums;
  }
  public getOneAlbum(id: string): Album {
    const album = db.albums.find((album) => album.id === id);

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

    db.albums.push(newAlbum);

    return newAlbum;
  }
  public deleteAlbum(id: string): string {
    const album = this.getOneAlbum(id);
    db.albums = db.albums.filter((album) => album.id !== id);

    db.tracks.forEach((track) => {
      if (track.albumId === album.id) {
        track.albumId = null;
      }
    });
    db.favorites.albums = db.favorites.albums.filter((a) => a.id !== album.id);

    return album.id;
  }

  public updateAlbum(id: string, updateAlbumData: UpdateAlbumDto): Album {
    const album = this.getOneAlbum(id);
    this.deleteAlbum(id);
    const updatedAlbum = { ...album, ...updateAlbumData };
    db.albums.push(updatedAlbum);

    return updatedAlbum;
  }
}
