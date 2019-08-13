import React, { FC } from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';

export const SpacedRow: FC<ViewProps> = ({ style, ...props }) => (
  <View style={[styles.container, style]} {...props} />
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  }
});
