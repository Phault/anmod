import { types } from 'mobx-state-tree';
import { EpisodeRequest } from './EpisodeRequest';

export const SeasonRequest = types.model('SeasonRequest', {
  id: types.identifierNumber,
  seasonNumber: types.integer,
  episodes: types.array(EpisodeRequest)
});
