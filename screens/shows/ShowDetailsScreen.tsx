import React, { useEffect } from 'react';
import {
  Paragraph,
  Subheading,
  Headline,
  ActivityIndicator,
  Title
} from 'react-native-paper';
import { useStores } from '../../store/StoreContext';
import { useObserver } from 'mobx-react-lite';
import { MediaParallaxScroll } from '../../components/details/MediaParallaxScroll';
import { SimilarMedia } from '../movies/SimilarMovies';
import { TheTvDbId } from '../../types/ids';

import {
  NavigationScreenConfig,
  NavigationScreenOptions
} from 'react-navigation';
import Constants from 'expo-constants';
import { DetailsHeader } from '../../components/details/DetailsHeader';
import { SeasonList } from './seasonlist/SeasonList';
import { RequestSummaryList } from './requestsummary/RequestSummaryList';
import { StyleSheet } from 'react-native';

export interface ShowDetailsParams {
  id: TheTvDbId;
}

export const ShowDetailsScreen = ({ navigation }) => {
  const { id } = navigation.state.params as ShowDetailsParams;
  const {
    media: { shows },
    requests
  } = useStores();

  useEffect(() => {
    shows
      .fetch(id)
      .then(s => requests.shows.fetch(s.title, s.id))
      .catch(e => console.warn(e.message));
  }, [id]);

  return useObserver(() => {
    const media = shows.get(id);

    return (
      <MediaParallaxScroll media={media}>
        {media ? (
          <>
            <DetailsHeader media={media}>
              <Subheading>{media.releaseDate.getFullYear()}</Subheading>
              <Headline>{media.title}</Headline>
            </DetailsHeader>
            <Paragraph style={styles.item}>{media.overview}</Paragraph>
            <SeasonList show={media} style={styles.item} />
            {media.isRequested ? (
              <>
                <Title>Requests</Title>
                <RequestSummaryList
                  request={media.request}
                  style={styles.item}
                />
              </>
            ) : null}
            <SimilarMedia media={media} />
          </>
        ) : (
          <ActivityIndicator size="large" />
        )}
      </MediaParallaxScroll>
    );
  });
};

ShowDetailsScreen.navigationOptions = {
  headerTransparent: true,
  headerStyle: {
    backgroundColor: 'transparent',
    marginTop: Constants.statusBarHeight
  }
} as NavigationScreenConfig<NavigationScreenOptions>;

const styles = StyleSheet.create({
  item: {
    marginBottom: 12
  }
});
