import React, { FC } from 'react';
import { View, Animated } from 'react-native';
import Constants from 'expo-constants';
import { Header as NavigationHeader } from 'react-navigation';
import { Appbar } from 'react-native-paper';
import { Instance } from 'mobx-state-tree';
import { observer } from 'mobx-react-lite';
import observableDimensions, {
  Orientation
} from '../../utils/observableDimensions';
import { AnyMedia } from '../../store/media/AnyMedia';
import styled from 'styled-components/native';
import ParallaxScroll from '@monterosa/react-native-parallax-scroll';
import { useTheme } from '../../Theme';
import { BackgroundImage } from './BackgroundImage';

const Header = ({ animatedValue, height }) => {
  const opacity = animatedValue.interpolate({
    inputRange: [0, height],
    outputRange: [0, 1],
    extrapolate: 'clamp'
  });

  const theme = useTheme();

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

export interface MediaParallaxScrollProps {
  media: Instance<typeof AnyMedia>;
}

export const MediaParallaxScroll: FC<MediaParallaxScrollProps> = observer(
  ({ media, children }) => {
    const theme = useTheme();

    return (
      <ParallaxScroll
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
          media && <BackgroundImage media={media} />
        }
        parallaxBackgroundScrollSpeed={5}
        style={{
          backgroundColor: theme.colors.background,
          flex: 1
        }}
        width={observableDimensions.width}
        height={observableDimensions.height}
        contentContainerStyle={{
          paddingHorizontal:
            observableDimensions.orientation === Orientation.landscape
              ? observableDimensions.width * 0.05
              : 0,
          paddingBottom: 12
        }}>
        <Background>{children}</Background>
      </ParallaxScroll>
    );
  }
);
