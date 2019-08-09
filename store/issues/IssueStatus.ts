import { types } from 'mobx-state-tree';
import { OmbiStoreEntitiesRequestsIssuesStatusEnum } from '../../ombi-api/model';

export const IssueStatus = types.enumeration<
  OmbiStoreEntitiesRequestsIssuesStatusEnum
>('IssueStatus', Object.values(OmbiStoreEntitiesRequestsIssuesStatusEnum));
