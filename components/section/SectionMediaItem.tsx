import React from 'react';
import { observer } from 'mobx-react-lite';
import { Instance } from 'mobx-state-tree';
import { SectionItem } from './SectionItem';
import { withNavigation } from 'react-navigation';
import { PosterSizes } from '../../types/ImageSizes';
import { AnyMedia } from '../../store/media/AnyMedia';
import { MovieDetailsParams } from '../../screens/movies/MovieDetailsScreen';
import { ShowDetailsParams } from '../../screens/shows/ShowDetailsScreen';

export interface SectionMediaItemProps {
  media: Instance<typeof AnyMedia>;
}

export const SectionMediaItem = withNavigation<SectionMediaItemProps>(
  observer(({ media, navigation }) => (
    <SectionItem
      title={media.title}
      year={media.releaseDate.getFullYear()}
      style={{ marginRight: 5 }}
      image={{
        uri: media.poster(PosterSizes.w185)
      }}
      onPress={() =>
        navigation.push('Details', {
          id: media.id
        } as MovieDetailsParams | ShowDetailsParams)
      }
    />
  ))
);
