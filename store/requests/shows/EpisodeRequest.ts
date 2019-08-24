import { types } from 'mobx-state-tree';

export const EpisodeRequest = types.model('EpisodeRequest', {
  id: types.identifierNumber,
  episodeNumber: types.number
});
