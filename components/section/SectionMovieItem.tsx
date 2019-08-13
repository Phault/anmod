import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Instance } from 'mobx-state-tree';
import { Movie } from '../../store/media/Movie';
import { SectionItem } from './SectionItem';
import { withNavigation } from 'react-navigation';

export interface SectionMovieItemProps {
  movie: Instance<typeof Movie.Type>;
}

export const SectionMovieItem = withNavigation<SectionMovieItemProps>(
  observer(({ movie, navigation }) => (
    <SectionItem
      title={movie.title}
      year={movie.releaseDate.getFullYear()}
      style={{ marginRight: 5 }}
      image={{
        uri: 'https://image.tmdb.org/t/p/w185' + movie.poster
      }}
      onPress={() => navigation.push('Details', { movieId: movie.id })}
    />
  ))
);
