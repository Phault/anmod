import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { SectionItem } from './SectionItem';

export const LoadingSectionItem = () => (
  <View
    style={{
      width: '100%'
    }}>
    <SectionItem title=" " image={null} year=" " style={{ opacity: 0 }} />
    <View
      style={[
        StyleSheet.absoluteFill,
        { justifyContent: 'center', alignItems: 'center' }
      ]}>
      <ActivityIndicator size="large" />
    </View>
  </View>
);
