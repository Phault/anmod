import { types, IAnyModelType } from 'mobx-state-tree';
import { ShowSeason } from './ShowSeason';
import { ShowRequest } from '../requests/shows/ShowRequest';
import { shim, mst } from 'classy-mst';
import { BaseModel } from '../BaseModel';

const ShowData = BaseModel.props({
  id: types.identifierNumber,
  title: types.string,
  releaseDate: types.Date,
  overview: types.string,
  seasons: types.array(ShowSeason),
  imdbId: types.string,
  posterPath: types.string,
  background: types.string,
  request: types.maybeNull(
    types.reference(types.late((): IAnyModelType => ShowRequest))
  )
});

class ShowCode extends shim(ShowData) {
  get isFullyAvailable() {
    return this.seasons.every(s => s.isFullyAvailable);
  }

  get hasStarted() {
    // TODO: is season 0 the first season or extras?
    return this.seasons[0].episodes[0].airDate.getTime() < Date.now();
  }
}

export const Show = mst(ShowCode, ShowData, 'Show');
