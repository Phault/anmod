import { types, IAnyModelType, Instance } from 'mobx-state-tree';
import { Show } from '../../media/shows/Show';
import { ShowChildRequest } from './ShowChildRequest';
import { BaseModel } from '../../BaseModel';
import { shim, mst } from 'classy-mst';

const ShowRequestData = BaseModel.props({
  id: types.identifierNumber,
  childRequests: types.array(ShowChildRequest),
  rootFolder: types.maybeNull(types.integer),
  qualityOverride: types.maybeNull(types.integer),
  _show: types.reference(types.late((): IAnyModelType => Show))
});

class ShowRequestCode extends shim(ShowRequestData) {
  get show(): Instance<typeof Show> {
    return this._show;
  }
}

export const ShowRequest = mst(ShowRequestCode, ShowRequestData, 'ShowRequest');
