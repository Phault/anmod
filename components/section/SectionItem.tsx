import React, { useContext, memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableRipple, Text, Surface, Caption } from 'react-native-paper';
import { ThemeContext } from 'styled-components';
import styled from 'styled-components/native';
import { ScaledImage } from '../ScaledImage';

const SectionItemText = styled(Text)`
  font-size: 16px;
`;

export const SectionItem = memo<any>(
  ({ title, year, image, style = undefined, ...rest }) => {
    const theme = useContext(ThemeContext);

    return (
      <Surface
        style={[style, { width: 150, maxWidth: 150, alignContent: 'stretch' }]}>
        <ScaledImage source={image} width={150} />
        <View style={{ padding: 5 }}>
          <SectionItemText numberOfLines={1}>{title}</SectionItemText>
          <SectionItemText as={Caption}>{year}</SectionItemText>
        </View>
        <TouchableRipple
          delayPressIn={0}
          rippleColor={theme.colors.primary}
          style={StyleSheet.absoluteFill}
          {...rest}>
          <View />
        </TouchableRipple>
      </Surface>
    );
  }
);
