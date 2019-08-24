import { types, getParentOfType } from 'mobx-state-tree';
import { ShowSeason } from './ShowSeason';
import { Show } from './Show';
import { RequestStatus } from '../../requests/RequestStatus';

export const Episode = types
  .model('Episode', {
    number: types.identifierNumber,
    title: types.string,
    airDate: types.Date,
    available: false
  })
  .views(self => ({
    get hasAired() {
      return self.airDate.getTime() < Date.now();
    },

    get requestStatus() {
      const season = getParentOfType(self, ShowSeason);
      const show = getParentOfType(season, Show);

      if (!show.isRequested) return RequestStatus.None;

      const request = show.request;

      const childRequests = request.childRequests.filter(cr => {
        const seasonRequest = cr.seasonRequests.find(
          sr => sr.seasonNumber === season.number
        );

        return (
          seasonRequest &&
          seasonRequest.episodes.find(e => e.episodeNumber === self.number)
        );
      });

      let bestStatus = RequestStatus.None;

      for (const childRequest of childRequests) {
        switch (childRequest.status) {
          case RequestStatus.Approved:
            return RequestStatus.Approved;
          case RequestStatus.Pending:
            bestStatus = RequestStatus.Pending;
            break;
          case RequestStatus.Denied:
            if (bestStatus === RequestStatus.None)
              bestStatus = RequestStatus.Denied;
            break;
        }
      }

      return bestStatus;
    }
  }));
