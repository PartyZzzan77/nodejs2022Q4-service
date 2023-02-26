import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TracksModule } from './tracks/tracks.module';
import { AlbumsModule } from './albums/albums.module';
import { ArtistsModule } from './artists/artists.module';
import { FavoritesModule } from './favorites/favorites.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './ormconfig';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './auth/middlewares/auth.middleware';
import { UsersController } from './users/users.controller';
import { TracksController } from './tracks/tracks.controller';
import { AlbumsController } from './albums/albums.controller';
import { ArtistsController } from './artists/artists.controller';
import { FavoritesController } from './favorites/favorites.controller';
import { AuthGuard } from './auth/guards/auth.guard';
import { LoggerModule } from './logger/loger.module';
import { LoggerMiddleware } from './logger/middlewares/logger.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    AuthModule,
    UsersModule,
    AlbumsModule,
    TracksModule,
    ArtistsModule,
    FavoritesModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthGuard],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        {
          path: '/',
          method: RequestMethod.ALL,
        },
        {
          path: 'auth/*',
          method: RequestMethod.ALL,
        },
        {
          path: 'doc',
          method: RequestMethod.ALL,
        },
      )
      .forRoutes(
        UsersController,
        TracksController,
        AlbumsController,
        ArtistsController,
        FavoritesController,
      );
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
