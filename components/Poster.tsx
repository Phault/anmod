import React, { FC } from 'react';
import { View, ViewProps } from 'react-native';
import { Surface } from 'react-native-paper';
import { ScaledImage } from './ScaledImage';
import { Instance } from 'mobx-state-tree';
import { Observer } from 'mobx-react-lite';
import { AnyMedia } from '../store/media/AnyMedia';
import { PosterSizes } from '../types/ImageSizes';

export interface PosterProps extends ViewProps {
  media: Instance<typeof AnyMedia>;
  height: number;
}

export const Poster: FC<PosterProps> = ({ media, height, ...rest }) => (
  <View {...rest}>
    <Surface
      style={{
        elevation: 4
      }}>
      <Observer>
        {() => (
          <ScaledImage
            source={{
              uri: media.poster(PosterSizes.w154)
            }}
            height={height}
          />
        )}
      </Observer>
    </Surface>
  </View>
);
