import { types } from 'mobx-state-tree';
import { Movie } from './Movie';
import { Show } from './Show';

export const AnyMedia = types.union(Movie, Show);
