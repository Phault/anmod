import Axios, { AxiosInstance } from 'axios';
import Config from 'react-native-config';
import { TheMovieDbId, TheTvDbId, ImdbId } from './types/ids';
import rateLimit from 'axios-rate-limit';
import {
  throttleAdapterEnhancer,
  cacheAdapterEnhancer
} from 'axios-extensions';

export enum TmdbExternalSource {
  imdb = 'imdb_id',
  tvdb = 'tvdb_id',
  tmdb = 'id'
}

export interface TmdbTvListResult {
  id: TheMovieDbId;
  overview: string;
  name: string;
  original_name: string;
  original_language: string;
  origin_country: string[];
  first_air_date: string;
  genre_ids: number[];
  popularity: number;
  vote_count: number;
  vote_average: number;
  poster_path: string | null;
  backdrop_path: string | null;
}

export interface TmdbFindResult {
  movie_results: [];
  person_results: [];
  tv_results: TmdbTvListResult[];
  tv_episode_results: [];
  tv_season_results: [];
}

export interface TmdbPagination<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export type TmdbExternalIdsResult = {
  [k in TmdbExternalSource]: string | number | null
};

export enum TmdbTvLists {
  popular = 'popular',
  topRated = 'top_rated',
  onTheAir = 'on_the_air',
  airingToday = 'airing_today'
}

const tmdbAxios = rateLimit(
  Axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: { 'Cache-Control': 'no-cache' },
    adapter: cacheAdapterEnhancer(Axios.defaults.adapter)
  }),
  { maxRequests: 20, perMilliseconds: 5000 }
) as AxiosInstance;

export const TmdbApi = {
  find(externalId: ImdbId | TheTvDbId, externalSource: TmdbExternalSource) {
    return tmdbAxios.get<TmdbFindResult>(
      `find/${externalId}?external_source=${externalSource}&api_key=${
        Config.TMDB_API_KEY
      }`
    );
  },

  getTvRecommendations(id: TheMovieDbId) {
    return tmdbAxios.get<TmdbPagination<TmdbTvListResult>>(
      `tv/${id}/recommendations?api_key=${Config.TMDB_API_KEY}`
    );
  },

  getTvExternalIds(id: TheMovieDbId) {
    return tmdbAxios.get<TmdbExternalIdsResult>(
      `tv/${id}/external_ids?api_key=${Config.TMDB_API_KEY}`
    );
  },

  getTvList(list: TmdbTvLists) {
    return tmdbAxios.get<TmdbPagination<TmdbTvListResult>>(
      `tv/${list}?api_key=${Config.TMDB_API_KEY}`
    );
  }
};
