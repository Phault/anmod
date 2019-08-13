import { types, getParentOfType } from 'mobx-state-tree';
import { User } from '../users/User';
import { IssueComment } from './IssueComment';
import { IssueStatus } from './IssueStatus';
import { IssueCategory } from './IssueCategory';
import { RequestType } from '../requests/RequestType';
import { RootStore } from '../RootStore';
import { OmbiStoreEntitiesRequestsIssuesRequestTypeEnum } from '../../ombi-api/model';

// export const MediaReference = types.reference(AnyMedia, {
//   get(identifier: string, parent: any) {
//     return Movie.create({});
//   },

//   set(value: Instance<typeof AnyMedia>) {
//     return value.;
//   }
// })

export const Issue = types
  .model('Issue', {
    id: types.identifierNumber,
    subject: '',
    description: '',
    status: types.optional(IssueStatus, 'Pending'),
    mediaType: RequestType,
    mediaId: types.string,
    author: types.reference(User),
    comments: types.map(IssueComment),
    category: types.reference(IssueCategory)
  })
  .views(self => ({
    get media() {
      const mediaStore = getParentOfType(self, RootStore).media;

      switch (self.mediaType) {
        case OmbiStoreEntitiesRequestsIssuesRequestTypeEnum.Movie:
          return mediaStore.movies.get(self.mediaId);
        case OmbiStoreEntitiesRequestsIssuesRequestTypeEnum.TvShow:
          return mediaStore.shows.get(self.mediaId);
      }

      return null;
    }
  }));
