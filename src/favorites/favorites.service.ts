import { Injectable } from '@nestjs/common';
import { FindOneParams } from '../repository/types';
import { RepositoryService } from '../repository/repository.service';

@Injectable()
export class FavoritesService {
  constructor(public repository: RepositoryService) {}
  public find() {
    return this.repository.findFav();
  }

  public create({ key, id }: FindOneParams) {
    return this.repository.createFav({ key, id });
  }
  public delete({ key, id }: FindOneParams) {
    return this.repository.deleteFav({ key, id });
  }
}
