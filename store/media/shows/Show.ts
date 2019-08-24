import {
  types,
  IAnyModelType,
  Instance,
  flow,
  getParentOfType,
  castToReferenceSnapshot,
  SnapshotIn,
  isValidReference
} from 'mobx-state-tree';
import { ShowSeason } from './ShowSeason';
import { ShowRequest } from '../../requests/shows/ShowRequest';
import { shim, action } from 'classy-mst';
import { BaseModel } from '../../BaseModel';
import { PosterSizes, BackdropSizes } from '../../../types/ImageSizes';
import { $enum } from 'ts-enum-util';
import { RequestType } from '../../../types/RequestType';
import { ShowStore } from './ShowStore';
import { mstWithReferenceChildren } from '../../../utils/RecursiveType';
import { ThenArg } from '../../../types/ThenArg';
import {
  TmdbApi,
  TmdbExternalIdsResult,
  TmdbTvListResult,
  TmdbExternalSource
} from '../../../TmdbApi';
import { merge } from '../../../utils/merge';
import { api } from '../../../api';

function snapshotFromTmdbShow(tmdbShow: TmdbTvListResult) {
  return {
    title: tmdbShow.name,
    overview: tmdbShow.overview,
    posterPath: tmdbShow.poster_path,
    backdropPath: tmdbShow.backdrop_path,
    releaseDate: new Date(tmdbShow.first_air_date),
    tmdbId: tmdbShow.id,
    lastUpdated: new Date()
  } as SnapshotIn<typeof Show>;
}

function snapshotFromExternalIds(externalIds: TmdbExternalIdsResult) {
  return {
    id: externalIds.tvdb_id,
    tmdbId: externalIds.id,
    imdbId: externalIds.imdb_id
  } as SnapshotIn<typeof Show>;
}

const ShowData = BaseModel.props({
  id: types.identifierNumber,
  title: types.string,
  releaseDate: types.Date,
  overview: types.string,
  seasons: types.array(ShowSeason),
  imdbId: types.maybeNull(types.string),
  tmdbId: types.maybeNull(types.number),
  posterPath: types.maybeNull(types.string),
  backdropPath: types.maybeNull(types.string),
  _request: types.maybeNull(
    types.reference(types.late((): IAnyModelType => ShowRequest))
  )
});

class ShowCode extends shim(ShowData) {
  similar: (this | ShowCode)[];

  get request(): Instance<typeof ShowRequest> {
    return this._request;
  }

  get isRequested() {
    return isValidReference(() => this.request);
  }

  get available() {
    return this.seasons.every(s => s.isFullyAvailable);
  }

  poster(size: PosterSizes) {
    if (!this.posterPath) return null;

    if (this.posterPath.startsWith('/'))
      return `https://image.tmdb.org/t/p/${size}${this.posterPath}`;

    return this.posterPath;
  }

  backdrop(size: BackdropSizes) {
    if (!this.backdropPath) return null;

    if (this.backdropPath.startsWith('/'))
      return `https://image.tmdb.org/t/p/${size}${this.backdropPath}`;

    return this.backdropPath;
  }

  @action
  fetchPoster() {
    const self = this;

    return flow(function*() {
      const { data: posterPath } = yield api.images.imagesPosterTvByTvdbidGet(
        self.id
      );

      if (posterPath) self.posterPath = posterPath;

      return posterPath as string;
    })();
  }

  @action
  fetchBackdrop() {
    const self = this;

    return flow(function*() {
      const {
        data: backdropPath
      } = yield api.images.imagesBackgroundTvByTvdbidGet(self.id);

      if (backdropPath) self.backdropPath = backdropPath;

      return backdropPath as string;
    })();
  }

  @action
  fetchImages() {
    if (this.posterPath && this.backdropPath) return Promise.resolve();

    const self = this;

    return flow(function*() {
      yield Promise.all([self.fetchPoster(), self.fetchBackdrop()]);

      try {
        if (!self.posterPath || !self.backdropPath) yield self.fetchTmdbData();
      } catch (e) {
        console.warn(e.message);
      }
    })();
  }

  @action
  fetchTmdbData() {
    const self = this;

    return flow(function*() {
      const { data: findResult } = (yield TmdbApi.find(
        self.id,
        TmdbExternalSource.tvdb
      )) as ThenArg<typeof TmdbApi.find>;

      const tmdbShow = findResult.tv_results[0];

      if (!tmdbShow) {
        throw new Error(
          `Couldn't find ${self.title} with tvdb id ${self.id} on tmdb.`
        );
      }

      if (!self.backdropPath && tmdbShow.backdrop_path)
        self.backdropPath = tmdbShow.backdrop_path;

      if (!self.posterPath && tmdbShow.poster_path)
        self.posterPath = tmdbShow.poster_path;

      self.tmdbId = tmdbShow.id;
    })();
  }

  @action
  fetchSimilar() {
    const self = this;

    return flow(function*() {
      yield self.fetchTmdbData();

      const showStore = getParentOfType(self, ShowStore);

      const { data: similar } = (yield TmdbApi.getTvRecommendations(
        self.tmdbId
      )) as ThenArg<typeof TmdbApi.getTvRecommendations>;

      const snapshots = similar.results.slice(0, 5).map(snapshotFromTmdbShow);
      const idResponses = (yield Promise.all(
        snapshots.map(s => TmdbApi.getTvExternalIds(s.tmdbId))
      )) as ThenArg<typeof TmdbApi.getTvExternalIds>[];

      const merged = snapshots.map((s, index) =>
        merge(s, snapshotFromExternalIds(idResponses[index].data))
      );

      self.similar = merged
        .filter(s => s.tmdbId)
        .map(s => showStore.update(s).id) as any;

      return self.similar;
    })();
  }
}

export const { Model: Show } = mstWithReferenceChildren(
  ShowCode,
  ShowData,
  'Show'
);
