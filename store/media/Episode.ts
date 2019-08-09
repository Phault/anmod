import { types } from 'mobx-state-tree';

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
      // const season = getParentOfType(self, ShowSeason);
      // const request = getParentOfType(season, Show).request as Instance<typeof ShowRequest>;
      // const childRequests = request.childRequests.filter(cr => {
      //   const seasonRequest = cr.seasonRequests.find(sr => sr.seasonNumber === season.number);
      //   return seasonRequest && seasonRequest.episodes.find(e => e.episodeNumber === self.number);
      // });

      // find a request containing this episode
      return null;
    }
  }));
