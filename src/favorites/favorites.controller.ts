import { Controller, Get } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { Favorite } from './Entities/favorite.entities';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}
  @Get()
  getAllFavorites(): Favorite {
    return this.favoritesService.getAllFavorites();
  }
}
