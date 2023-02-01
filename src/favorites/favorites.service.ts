import { Injectable } from '@nestjs/common';
import { db } from '../DB/db.service';
import { Favorite } from './Entities/favorite.entities';

@Injectable()
export class FavoritesService {
  private favorites: Favorite = db.favorites;

  public getAllFavorites(): Favorite {
    return this.favorites;
  }
}
