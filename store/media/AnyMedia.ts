import { types } from 'mobx-state-tree';
import { Movie } from './movies/Movie';
import { Show } from './shows/Show';

export const AnyMedia = types.union(Movie, Show);
