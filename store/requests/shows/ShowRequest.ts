import { types, IAnyModelType } from 'mobx-state-tree';
import { Show } from '../../media/Show';
import { ShowChildRequest } from './ShowChildRequest';
import { BaseModel } from '../../BaseModel';

export const ShowRequest = BaseModel.named('ShowRequest').props({
  id: types.identifierNumber,
  childRequests: types.array(ShowChildRequest),
  rootFolder: types.integer,
  qualityOverride: types.integer,
  show: types.reference(types.late((): IAnyModelType => Show))
});
