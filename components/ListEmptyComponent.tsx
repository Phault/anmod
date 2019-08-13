import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Subheading } from 'react-native-paper';

export const ListEmptyComponent = () => (
  <View style={styles.emptyContainer}>
    <Subheading>There's nothing here...</Subheading>
  </View>
);

const styles = StyleSheet.create({
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject
  }
});
