import React, { FC } from 'react';
import { View, ViewProps } from 'react-native';
import { Surface } from 'react-native-paper';
import { ScaledImage } from './ScaledImage';
import { Instance } from 'mobx-state-tree';
import { Observer } from 'mobx-react-lite';
import { Movie } from '../store/media/Movie';

export interface PosterProps extends ViewProps {
  movie: Instance<typeof Movie>;
  height: number;
}

export const Poster: FC<PosterProps> = ({ movie, height, ...rest }) => (
  <View {...rest}>
    <Surface
      style={{
        elevation: 4
      }}>
      <Observer>
        {() => (
          <ScaledImage
            source={{
              uri: 'https://image.tmdb.org/t/p/w154' + movie.poster
            }}
            height={height}
          />
        )}
      </Observer>
    </Surface>
  </View>
);
