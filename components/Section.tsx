import React, { FC } from 'react';
import {
  View,
  ScrollView,
  TextStyle,
  StyleProp,
  ViewProps
} from 'react-native';
import { Title } from 'react-native-paper';

export interface SectionProps extends ViewProps {
  title: string;
  titleStyle?: StyleProp<TextStyle>;
}

export const Section: FC<SectionProps> = ({
  title,
  titleStyle,
  children,
  ...rest
}) => (
  <View {...rest}>
    <Title style={titleStyle}>{title}</Title>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ minWidth: '100%' }}>
      {children}
    </ScrollView>
  </View>
);
