import { types } from 'mobx-state-tree';
import { RequestQuota } from './RequestQuota';
import { BaseModel } from '../BaseModel';
import md5 from 'md5';

// export const UserQualityProfiles = types.model('UserQualityProfiles', {
//   sonarrQualityProfileAnime: 0,
//   sonarrRootPathAnime: 0,
//   sonarrRootPath: 0,
//   sonarrQualityProfile: 0,
//   radarrRootPath: 0,
//   radarrQualityProfile: 0
// });

export const User = BaseModel.named('User')
  .props({
    id: types.identifier,
    username: types.string,
    alias: types.maybeNull(types.string),
    email: types.maybeNull(types.string),
    claims: types.map(types.boolean),
    movieRequestQuota: types.maybeNull(RequestQuota),
    episodeRequestQuota: types.maybeNull(RequestQuota),
    musicRequestQuota: types.maybeNull(RequestQuota)
  })
  .views(self => ({
    get emailHash() {
      return md5(self.email.trim().toLowerCase());
    },

    hasClaim(claim: string) {
      return self.claims.get(claim) || false;
    }
  }));
