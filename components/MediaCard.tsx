import React, { FC } from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import { TouchableRipple, Surface } from 'react-native-paper';
import { observer } from 'mobx-react-lite';
import { Instance } from 'mobx-state-tree';
import FastImage from 'react-native-fast-image';
import { AnyMedia } from '../store/media/AnyMedia';

export interface MediaCardProps {
  media: Instance<typeof AnyMedia>;
  style?: StyleProp<ViewStyle>;
  posterStyle?: StyleProp<ViewStyle>;
  backgroundStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export const MediaCard: FC<MediaCardProps> = observer(
  ({ media, onPress, style, posterStyle, backgroundStyle, children }) => (
    <Surface style={[styles.container, style]}>
      <FastImage
        source={{
          uri: 'https://image.tmdb.org/t/p/w154' + media.poster
        }}
        style={[styles.poster, posterStyle]}
        resizeMode="cover"
      />
      <View style={styles.contents}>
        <FastImage
          source={{
            uri: 'https://image.tmdb.org/t/p/w300' + media.background
          }}
          style={[styles.backgroundImage, backgroundStyle]}
          resizeMode="cover"
        />
        {children}
      </View>
      <TouchableRipple
        style={StyleSheet.absoluteFill}
        onPress={onPress}
        rippleColor="orange"
        delayPressIn={0}>
        <View />
      </TouchableRipple>
    </Surface>
  )
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
  contents: {
    padding: 10,
    flex: 1
  }
});
