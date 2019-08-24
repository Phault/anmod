import { types, SnapshotIn, flow, Instance } from 'mobx-state-tree';
import { Show } from './Show';
import {
  OmbiCoreModelsSearchSearchTvShowViewModel,
  OmbiStoreRepositoryRequestsSeasonRequests,
  OmbiStoreRepositoryRequestsEpisodeRequests,
  OmbiStoreEntitiesRequestsTvRequests
} from '../../../ombi-api/model';
import { TheTvDbId } from '../../../types/ids';
import { api } from '../../../api';
import { ThenArg } from '../../../types/ThenArg';
import { shim, action, mst } from 'classy-mst';
import { merge } from '../../../utils/merge';
import { ShowSeason } from './ShowSeason';
import { Episode } from './Episode';

function episodeSnapshotFromServerEpisode(
  serverEpisode: OmbiStoreRepositoryRequestsEpisodeRequests
) {
  return {
    number: serverEpisode.episodeNumber,
    airDate: new Date(serverEpisode.airDate),
    available: serverEpisode.available,
    title: serverEpisode.title
  } as SnapshotIn<typeof Episode>;
}

function seasonSnapshotFromServerSeason(
  serverSeason: OmbiStoreRepositoryRequestsSeasonRequests
) {
  return {
    number: serverSeason.seasonNumber,
    episodes: serverSeason.episodes.map(episodeSnapshotFromServerEpisode)
  } as SnapshotIn<typeof ShowSeason>;
}

function snapshotFromServerShow(
  serverShow: OmbiCoreModelsSearchSearchTvShowViewModel
) {
  return {
    id: serverShow.id,
    imdbId: serverShow.imdbId || undefined,
    overview: serverShow.overview,
    title: serverShow.title,
    posterPath: serverShow.banner || undefined,
    releaseDate: new Date(serverShow.firstAired),
    lastUpdated: new Date(),
    seasons: serverShow.seasonRequests.map(seasonSnapshotFromServerSeason)
  } as SnapshotIn<typeof Show>;
}

function snapshotFromServerRequest(
  serverRequest: OmbiStoreEntitiesRequestsTvRequests
) {
  return {
    id: serverRequest.tvDbId,
    backdropPath: serverRequest.background,
    posterPath: serverRequest.posterPath,
    imdbId: serverRequest.imdbId || undefined,
    overview: serverRequest.overview,
    title: serverRequest.title,
    releaseDate: new Date(serverRequest.releaseDate),
    _request: serverRequest.id,
    lastUpdated: new Date()
  } as SnapshotIn<typeof Show>;
}

const ShowStoreData = types.model({
  shows: types.map(Show)
});

class ShowStoreCode extends shim(ShowStoreData) {
  get(id: TheTvDbId | string) {
    return this.shows.get(id.toString());
  }

  @action
  update(patch: SnapshotIn<typeof Show>): Instance<typeof Show> {
    const existing = this.shows.get(patch.id.toString());

    if (existing) {
      if (existing.posterPath) delete patch.posterPath;
      if (existing.title) delete patch.title;
      if (existing.overview) delete patch.overview;

      merge(existing, patch);
    }

    return existing || this.shows.put(patch);
  }

  @action
  updateFromServer(
    serverShow: OmbiCoreModelsSearchSearchTvShowViewModel
  ): Instance<typeof Show> {
    const snapshot = snapshotFromServerShow(serverShow);
    return this.update(snapshot);
  }

  @action
  updateFromServerRequest(
    serverShowRequest: OmbiStoreEntitiesRequestsTvRequests
  ): Instance<typeof Show> {
    const snapshot = snapshotFromServerRequest(serverShowRequest);
    return this.update(snapshot);
  }

  @action
  fetch(id: TheTvDbId) {
    const self = this;

    return flow(function*() {
      const { data: serverShow } = (yield api.search.searchTvInfoByTvdbIdGet(
        id
      )) as ThenArg<typeof api.search.searchTvInfoByTvdbIdGet>;

      const show = self.updateFromServer(serverShow) as ReturnType<
        typeof self.updateFromServer
      >;

      yield show.fetchImages();

      return show;
    })();
  }

  @action
  search(query: string): Promise<Instance<typeof Show>[]> {
    if (!query) return Promise.resolve([]);

    const self = this;

    return flow(function*() {
      const response = (yield api.search.searchTvBySearchTermGet(
        query
      )) as ThenArg<typeof api.search.searchTvBySearchTermGet>;

      const shows = response.data.map(self.updateFromServer);

      Promise.all(shows.map(s => s.fetchImages().catch(() => {})));

      return shows;
    })();
  }
}

export const ShowStore = mst(ShowStoreCode, ShowStoreData, 'ShowStore');
