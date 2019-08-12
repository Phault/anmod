import React, { FC, memo } from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import { Title, TouchableRipple, Surface, Caption } from 'react-native-paper';
import { observer } from 'mobx-react-lite';
import { Instance } from 'mobx-state-tree';
import { MovieRequest } from '../../store/requests/movies/MovieRequest';
import FastImage from 'react-native-fast-image';
import { InfoLine } from '../InfoLine';

export interface RequestListItemProps {
  request: Instance<typeof MovieRequest>;
  onPress?: () => any;
  style?: StyleProp<ViewStyle>;
}

export const RequestListItem: FC<RequestListItemProps> = memo(
  observer(({ request, onPress, style }) => (
    <Surface style={[styles.container, style]}>
      <FastImage
        source={{
          uri: 'https://image.tmdb.org/t/p/w154' + request.movie.poster
        }}
        style={styles.poster}
        resizeMode="cover"
      />
      <View style={styles.contents}>
        <FastImage
          source={{
            uri: 'https://image.tmdb.org/t/p/w300' + request.movie.background
          }}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        <View style={styles.captionContainer}>
          <Caption>{request.movie.releaseDate.getFullYear()}</Caption>
          <Caption>Movie</Caption>
        </View>
        <Title numberOfLines={1} style={styles.title}>
          {request.movie.title}
        </Title>
        <InfoLine icon="person">{request.requestedBy.username}</InfoLine>
        <InfoLine icon="access-time">
          {request.requestedDate.toLocaleDateString()}{' '}
          {request.requestedDate.toLocaleTimeString()}
        </InfoLine>
        {/* <InfoLine icon="info">8 episodes from 2 seasons</InfoLine> */}
      </View>
      <TouchableRipple
        style={StyleSheet.absoluteFill}
        onPress={onPress}
        rippleColor="orange"
        delayPressIn={0}>
        <View />
      </TouchableRipple>
    </Surface>
  ))
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    overflow: 'hidden',
    flexDirection: 'row',
    flex: 1,
    elevation: 5
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.4
  },
  poster: { width: 90, height: '100%', minHeight: 144 },
  title: {
    fontSize: 18,
    lineHeight: 24
  },
  contents: {
    padding: 10,
    flex: 1
  },
  captionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  }
});
