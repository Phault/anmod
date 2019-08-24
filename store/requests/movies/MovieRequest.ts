import {
  types,
  IAnyModelType,
  Instance,
  getParentOfType,
  tryReference
} from 'mobx-state-tree';
import { User } from '../../users/User';
import { RequestStatusType, RequestStatus } from '../RequestStatus';
import { Movie } from '../../media/movies/Movie';
import { shim, mst } from 'classy-mst';
import { RootStore } from '../../RootStore';
import { BaseModel } from '../../BaseModel';

const MovieRequestData = BaseModel.props({
  id: types.identifierNumber,
  _movie: types.reference(types.late((): IAnyModelType => Movie)),
  requestedBy: types.maybeNull(types.reference(User)),
  requestedDate: types.maybeNull(types.Date),
  status: RequestStatusType,
  deniedReason: types.maybeNull(types.string),
  subscribed: false
});

class MovieRequestCode extends shim(MovieRequestData) {
  get movie(): Instance<typeof Movie> {
    return this._movie;
  }

  get canSubscribe() {
    const currentUser = getParentOfType(this, RootStore).users.currentUser;

    return (
      !this.movie.available &&
      this.status !== RequestStatus.Denied &&
      tryReference(() => this.requestedBy) !== currentUser
    );
  }
}

export const MovieRequest = mst(
  MovieRequestCode,
  MovieRequestData,
  'MovieRequest'
);
