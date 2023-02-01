import { Injectable } from '@nestjs/common';
import { Album } from './Entities/album.entities';

@Injectable()
export class AlbumsService {
  private albums: Album[] = [];
}
