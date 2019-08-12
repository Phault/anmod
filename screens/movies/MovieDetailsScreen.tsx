import React, { useContext, useEffect, useCallback, FC } from 'react';
import {
  View,
  Image,
  Animated,
  StyleSheet,
  Linking,
  StatusBar,
  Dimensions
} from 'react-native';
import {
  NavigationScreenConfig,
  NavigationScreenOptions,
  withNavigation
} from 'react-navigation';
import Constants from 'expo-constants';
import ParallaxScroll from '@monterosa/react-native-parallax-scroll';
import { Header as NavigationHeader } from 'react-navigation';
import {
  FAB,
  Appbar,
  ActivityIndicator,
  Subheading,
  Headline,
  Paragraph,
  Text
} from 'react-native-paper';
import { Section } from '../../components/Section';
import styled from 'styled-components/native';
import { ThemeContext } from 'styled-components';
import { useStores } from '../../store/StoreContext';
import { isValidReference, Instance } from 'mobx-state-tree';
import { RequestStatus } from '../../store/requests/RequestStatus';
import { useObserver, observer, Observer } from 'mobx-react-lite';
import { SectionMovieItem } from '../../components/SectionMovieItem';
import { Movie } from '../../store/media/Movie';
import { Poster } from '../../components/Poster';
import {
  ScaledImage,
  ScaledResponsiveImage
} from '../../components/ScaledImage';
import observableDimensions, {
  Orientation
} from '../../utils/observableDimensions';

const Header = ({ animatedValue, height }) => {
  const opacity = animatedValue.interpolate({
    inputRange: [0, height],
    outputRange: [0, 1],
    extrapolate: 'clamp'
  });

  const theme = useContext(ThemeContext);

  return (
    <Animated.View
      style={{
        height,
        width: '100%',
        opacity
      }}>
      <Appbar.Header
        style={{
          backgroundColor: theme.colors.surface,
          height: '100%'
        }}>
        <View />
      </Appbar.Header>
    </Animated.View>
  );
};

const Background = styled(View)`
  background: ${props => props.theme.colors.background};
  flex-grow: 1;
  padding: 12px;
  padding-top: 0;
`;

const ThemedParallaxScroll = ({ style = undefined, ...props }) => {
  const theme = useContext(ThemeContext);
  return useObserver(() => (
    <ParallaxScroll
      style={{
        backgroundColor: theme.colors.background,
        flex: 1,
        ...style
      }}
      width={observableDimensions.width}
      height={observableDimensions.height}
      contentContainerStyle={{
        paddingHorizontal:
          observableDimensions.orientation === Orientation.landscape
            ? observableDimensions.width * 0.05
            : 0,
        paddingBottom: 12
      }}
      {...props}
    />
  ));
};

const StyledFab = styled(FAB).attrs(props => ({
  color: props.theme.colors.text
}))`
  position: absolute;
  top: -30px;
  right: 0;
  background: ${props => props.theme.colors.primary};
`;

const HeadingContainer = styled.View.attrs({
  pointerEvents: 'none'
})`
  padding: 12px;
  padding-bottom: 0px;
  flex: 1;
`;

interface SimilarMoviesProps {
  movie: Instance<typeof Movie>;
}

const SimilarMovies: FC<SimilarMoviesProps> = ({ movie }) => {
  useEffect(() => {
    movie.fetchSimilar().catch(e => console.log(e.message));
  }, [movie]);

  return useObserver(
    () =>
      movie.similar.length > 0 && (
        <Section title="Similar">
          {movie.similar.map(m => (
            <SectionMovieItem key={m.id} movie={m} />
          ))}
        </Section>
      )
  );
};

export const MovieDetailsScreen = ({ navigation }) => {
  const movieId = navigation.state.params.movieId;

  const { media, requests } = useStores();

  useEffect(() => {
    media
      .fetchMovie(movieId)
      .then(m => {
        if (isValidReference(() => m.request))
          return requests.fetchMovieRequest(m.title);

        return undefined;
      })
      .catch(e => console.log(e.message));
  }, [movieId]);

  return useObserver(() => {
    const movie = media.movies.get(movieId);

    let fab = null;
    if (movie) {
      if (movie.available) {
        fab = (
          <StyledFab
            icon="play-arrow"
            onPress={() => {
              Linking.openURL(movie.plexUrl || movie.embyUrl);
            }}
          />
        );
      } else if (movie.isRequested) {
        switch (movie._request.status) {
          case RequestStatus.Approved:
            if (!movie._request.canSubscribe) {
              fab = (
                <StyledFab
                  icon={
                    movie._request.subscribed
                      ? 'notifications-off'
                      : 'add-alert'
                  }
                  onPress={() => {}}
                />
              );
            } else {
              fab = <StyledFab icon="schedule" disabled />;
            }
            break;
          case RequestStatus.Pending:
            fab = <StyledFab icon="remove" onPress={() => {}} />;
            break;
          case RequestStatus.Denied:
            fab = <StyledFab icon="minus-circle" disabled />;
            break;
        }
      } else {
        fab = (
          <StyledFab
            icon="add"
            onPress={() => requests.createMovieRequest(movie, 'en')}
          />
        );
      }
    }

    return (
      <ThemedParallaxScroll
        renderHeader={props => <Header {...props} />}
        headerHeight={Constants.statusBarHeight + NavigationHeader.HEIGHT}
        isHeaderFixed={true}
        isBackgroundScalable={false}
        parallaxHeight={
          observableDimensions.orientation === Orientation.portrait
            ? (observableDimensions.width * 9) / 16
            : observableDimensions.height * 0.4
        }
        backgroundScaleOrigin="top"
        renderParallaxBackground={() =>
          movie && (
            <Observer>
              {() => (
                <ScaledResponsiveImage
                  sources={{
                    1: {
                      uri: 'https://image.tmdb.org/t/p/w300' + movie.background
                    },
                    2: {
                      uri: 'https://image.tmdb.org/t/p/w780' + movie.background
                    },
                    3: {
                      uri: 'https://image.tmdb.org/t/p/w1280' + movie.background
                    }
                  }}
                  preferredPixelRatio={
                    observableDimensions.orientation === Orientation.landscape
                      ? 3
                      : undefined
                  }
                  width={observableDimensions.width}
                  ratio={9 / 16}
                  resizeMode="cover"
                />
              )}
            </Observer>
          )
        }
        parallaxBackgroundScrollSpeed={5}>
        <Background>
          {movie ? (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: 12
                }}>
                <Poster
                  movie={movie}
                  style={{
                    marginTop: -150 / 3
                  }}
                  height={150}
                />
                <HeadingContainer>
                  <Subheading>{movie.releaseDate.getFullYear()}</Subheading>
                  <Headline>{movie.title}</Headline>
                </HeadingContainer>
                {fab}
              </View>
              <Paragraph>{movie.overview}</Paragraph>
              <SimilarMovies movie={movie} />
            </>
          ) : (
            <ActivityIndicator size="large" />
          )}
        </Background>
      </ThemedParallaxScroll>
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
