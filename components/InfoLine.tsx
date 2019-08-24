import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const InfoLine = ({ icon, children, style = undefined }) => (
  <View style={styles.container}>
    <MaterialIcons name={icon} style={[styles.text, style]} />
    <Text style={[styles.text, style]}> {children}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' },
  text: {
    fontSize: 14,
    lineHeight: 20,
    marginVertical: 2,
    letterSpacing: 0.25,
    color: 'rgba(255, 255, 255, 0.87)'
  }
});
