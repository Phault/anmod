import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Paragraph } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

export const InfoLine = ({ icon, children }) => (
  <View style={styles.container}>
    <MaterialIcons name={icon} size={14} color="white" alpha={0.87} />
    <Paragraph> {children}</Paragraph>
  </View>
);

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' }
});
