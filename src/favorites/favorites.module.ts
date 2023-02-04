import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { RepositoryModule } from '../repository/repository.module';
import { FavoritesService } from './favorites.service';

@Module({
  imports: [RepositoryModule],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
