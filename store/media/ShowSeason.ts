import { types } from 'mobx-state-tree';
import { Episode } from './Episode';

export const ShowSeason = types
  .model('Season', {
    number: types.identifierNumber,
    episodes: types.array(Episode)
  })
  .views(self => ({
    get isFullyAvailable() {
      return self.episodes.every(e => e.available);
    }
  }));
