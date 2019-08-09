import {
  types,
  IAnyModelType,
  Instance,
  flow,
  getParentOfType,
  IModelType,
  ModelProperties,
  IArrayType,
  ModelCreationType2,
  ModelSnapshotType2,
  castToReferenceSnapshot,
  isValidReference
} from 'mobx-state-tree';
import { Issue } from '../issues/Issue';
import { MovieRequest } from '../requests/movies/MovieRequest';
import { MediaStore } from './MediaStore';
import { api } from '../../api';
import { ThenArg } from '../../types/ThenArg';
import { shim, mst, action } from 'classy-mst';
import { BaseModel } from '../BaseModel';

const MovieData = BaseModel.props({
  id: types.identifierNumber,
  title: types.string,
  releaseDate: types.Date,
  overview: types.string,
  imdbId: types.maybeNull(types.string),
  poster: types.maybeNull(types.string),
  background: types.maybeNull(types.string),
  _request: types.maybeNull(
    types.reference(types.late((): IAnyModelType => MovieRequest))
  ),
  available: false,
  plexUrl: types.maybeNull(types.string),
  embyUrl: types.maybeNull(types.string),
  issues: types.array(types.reference(Issue))
});

class MovieCode extends shim(MovieData) {
  similar: (this | MovieCode)[];

  get request(): Instance<typeof MovieRequest> {
    return this._request;
  }

  get isReleased() {
    return this.releaseDate.getTime() < Date.now();
  }

  get isRequested() {
    return isValidReference(() => this.request);
  }

  @action
  setRequest(request: Instance<typeof MovieRequest>) {
    this._request = request;
  }

  @action
  fetchSimilar() {
    const self = this;

    return flow(function*() {
      const mediaStore = getParentOfType(self, MediaStore);

      const {
        data: similar
      } = (yield api.search.searchMovieByTheMovieDbIdSimilarGet(
        self.id
      )) as ThenArg<typeof api.search.searchMovieByTheMovieDbIdSimilarGet>;

      self.similar = [...similar]
        .sort((a, b) => a.id - b.id) // makes sure they don't shift around
        .map(m =>
          castToReferenceSnapshot(mediaStore.updateMovieFromServer(m))
        ) as any;

      return self.similar;
    })();
  }
}

type RecursiveType<PROPS> = PROPS & {
  similar?: RecursiveType<PROPS>[];
};

function mstWithReferenceChildren<
  PROPS extends ModelProperties,
  OTHERS,
  CustomC,
  CustomS,
  TYPE
>(
  Code: new () => TYPE,
  Data: IModelType<PROPS, OTHERS, CustomC, CustomS>,
  name?: string
) {
  const Children = types.array(
    types.safeReference(types.late((): any => Model))
  );
  const Branch = ((Data as any) as IModelType<
    PROPS,
    TYPE,
    CustomC,
    CustomS
  >).props({
    similar: (Children as any) as IArrayType<
      IModelType<
        RecursiveType<PROPS>,
        OTHERS,
        RecursiveType<ModelCreationType2<PROPS, CustomC>>,
        RecursiveType<ModelSnapshotType2<PROPS, CustomS>>
      >
    >
  });

  const Model = mst(Code, Branch, name) as typeof Branch;

  return { Model, Children };
}

export const { Model: Movie } = mstWithReferenceChildren(
  MovieCode,
  MovieData,
  'Movie'
);
