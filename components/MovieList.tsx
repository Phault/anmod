import React from 'react';
import { FC, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  ImageBackground
} from 'react-native';
import { Paragraph, Title, Surface, TouchableRipple } from 'react-native-paper';
import { api } from '../api';
import { Movie } from '../store/media/Movie';
import { Instance } from 'mobx-state-tree';
import { observer } from 'mobx-react-lite';

const MediaStyles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    borderRadius: 3,
    overflow: 'hidden',
    margin: 5,
    flexDirection: 'row',
    flex: 1,
    elevation: 5
  }
});

export const MovieView: FC<{
  movie: Instance<typeof Movie.Type>;
  onPress?: () => any;
}> = observer(({ movie, onPress }) => (
  <Surface style={MediaStyles.container}>
    <Image
      source={{ uri: 'https://image.tmdb.org/t/p/w154' + movie.poster }}
      style={{ width: 125, height: '100%', minHeight: 200 }}
      resizeMode="cover"
    />
    <ImageBackground
      source={{ uri: 'https://image.tmdb.org/t/p/w300' + movie.background }}
      style={{
        flex: 1,
        padding: 10
      }}
      resizeMode="cover"
      imageStyle={{
        opacity: 0.4
      }}>
      <Title>
        {movie.title} ({movie.releaseDate.getFullYear()})
      </Title>
      <Paragraph numberOfLines={5}>{movie.overview}</Paragraph>
    </ImageBackground>
    <TouchableRipple
      style={StyleSheet.absoluteFill}
      onPress={onPress}
      rippleColor="orange"
      delayPressIn={0}>
      <View />
    </TouchableRipple>
  </Surface>
));

export const MovieList = () => {
  const [result, setResult] = useState<any>();
  const [error, setError] = useState<any>();

  useEffect(() => {
    api.search
      .searchMoviePopularGet()
      .then(r => setResult(r.data))
      .catch(e => setError(e));
  }, []);

  return result ? (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#263238' }}
      contentContainerStyle={{ padding: 10 }}>
      {result && result.map(m => <MovieView key={m.id} movie={m} />)}
    </ScrollView>
  ) : null;
};
