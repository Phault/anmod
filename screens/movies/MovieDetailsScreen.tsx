import React, { useEffect } from 'react';
import {
  Paragraph,
  Subheading,
  Headline,
  ActivityIndicator,
  Caption
} from 'react-native-paper';
import { useStores } from '../../store/StoreContext';
import { isValidReference } from 'mobx-state-tree';
import { useObserver } from 'mobx-react-lite';
import { MediaParallaxScroll } from '../../components/details/MediaParallaxScroll';
import { SimilarMedia } from './SimilarMovies';
import { TheMovieDbId } from '../../types/ids';

import {
  NavigationScreenConfig,
  NavigationScreenOptions
} from 'react-navigation';
import Constants from 'expo-constants';
import { DetailsHeader } from '../../components/details/DetailsHeader';
import { StatusIcon } from '../../components/StatusIcon';

export interface MovieDetailsParams {
  id: TheMovieDbId;
}

export const MovieDetailsScreen = ({ navigation }) => {
  const { id } = navigation.state.params as MovieDetailsParams;
  const {
    media: { movies },
    requests
  } = useStores();

  useEffect(() => {
    movies
      .fetch(id)
      .then(m => {
        if (isValidReference(() => m.request))
          return requests.movies.fetch(m.title, m.id);

        return undefined;
      })
      .catch(e => console.warn(e.message));
  }, [id]);

  return useObserver(() => {
    const media = movies.get(id);

    return (
      <MediaParallaxScroll media={media}>
        {media ? (
          <>
            <DetailsHeader media={media}>
              <Caption>{media.releaseDate.getFullYear()}</Caption>
              <Headline>{media.title}</Headline>
              <StatusIcon
                status={media.status}
                label={
                  media.status.substring(0, 1).toUpperCase() +
                  media.status.substring(1)
                }
              />
            </DetailsHeader>
            <Paragraph>{media.overview}</Paragraph>
            <SimilarMedia media={media} />
          </>
        ) : (
          <ActivityIndicator size="large" />
        )}
      </MediaParallaxScroll>
    );
  });
};

MovieDetailsScreen.navigationOptions = {
  headerTransparent: true,
  headerStyle: {
    backgroundColor: 'transparent',
    marginTop: Constants.statusBarHeight
  }
} as NavigationScreenConfig<NavigationScreenOptions>;
