import { types, Instance, cast } from 'mobx-state-tree';
import { TheMovieDbId, TheTvDbId } from '../../types/ids';
import { shim, action, mst } from 'classy-mst';
import { RequestType } from '../../types/RequestType';
import { AnyMedia } from './AnyMedia';
import { ShowStore } from './shows/ShowStore';
import { MovieStore } from './movies/MovieStore';
import { Movie } from './movies/Movie';
import { Show } from './shows/Show';

const MediaStoreData = types.model({
  movies: types.optional(MovieStore, {}),
  shows: types.optional(ShowStore, {})
});

type MediaTypeReturnType = {
  [RequestType.Movie]: typeof Movie;
  [RequestType.TvShow]: typeof Show;
  [RequestType.Album]: never;
};

class MediaStoreCode extends shim(MediaStoreData) {
  fetch<T extends RequestType>(
    id: TheMovieDbId | TheTvDbId,
    type: T
  ): Promise<Instance<MediaTypeReturnType[T]>>;
  @action
  fetch(
    id: TheMovieDbId | TheTvDbId,
    type: RequestType
  ): Promise<Instance<typeof AnyMedia>> {
    switch (type) {
      case RequestType.Movie:
        return this.movies.fetch(id);
      case RequestType.TvShow:
        return this.shows.fetch(id);
    }

    throw new Error('Unknown type');
  }

  get<T extends RequestType>(
    id: TheMovieDbId | TheTvDbId,
    type: T
  ): Instance<MediaTypeReturnType[T]>;
  get(
    id: TheMovieDbId | TheTvDbId,
    type: RequestType
  ): Instance<typeof AnyMedia> {
    switch (type) {
      case RequestType.Movie:
        return cast(this.movies.get(id));
      case RequestType.TvShow:
        return cast(this.shows.get(id));
    }

    throw new Error('Unknown type');
  }
}

export const MediaStore = mst(MediaStoreCode, MediaStoreData, 'MediaStore');
