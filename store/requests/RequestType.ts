import { types } from 'mobx-state-tree';
import { OmbiStoreEntitiesRequestsIssuesRequestTypeEnum } from '../../ombi-api/model';

export const RequestType = types.enumeration<
  OmbiStoreEntitiesRequestsIssuesRequestTypeEnum
>('RequestType', Object.values(OmbiStoreEntitiesRequestsIssuesRequestTypeEnum));
