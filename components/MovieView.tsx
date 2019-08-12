import React, { memo } from 'react';
import { FC } from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import { Paragraph, Title, Surface, TouchableRipple } from 'react-native-paper';
import { Movie } from '../store/media/Movie';
import { Instance } from 'mobx-state-tree';
import { observer } from 'mobx-react-lite';
import FastImage from 'react-native-fast-image';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    overflow: 'hidden',
    flexDirection: 'row',
    flex: 1,
    elevation: 5
  }
});

export interface MovieViewProps {
  movie: Instance<typeof Movie.Type>;
  onPress?: () => any;
  style?: StyleProp<ViewStyle>;
}

export const MovieView: FC<MovieViewProps> = memo(
  observer(({ movie, onPress, style }) => (
    <Surface style={[styles.container, style]}>
      <FastImage
        source={{ uri: 'https://image.tmdb.org/t/p/w154' + movie.poster }}
        style={{ width: 125, height: '100%', minHeight: 200 }}
        resizeMode="cover"
      />
      <View style={{ flex: 1, padding: 10 }}>
        <FastImage
          source={{ uri: 'https://image.tmdb.org/t/p/w300' + movie.background }}
          style={{
            ...StyleSheet.absoluteFillObject,
            opacity: 0.4
          }}
          resizeMode="cover"
        />
        <Title>
          {movie.title} ({movie.releaseDate.getFullYear()})
        </Title>
        <Paragraph numberOfLines={5}>{movie.overview}</Paragraph>
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
