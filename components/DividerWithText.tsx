import React from 'react';
import { Headline } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { Theme } from '../App';

const Divider = styled.View`
  background: ${({ theme }) => (theme as Theme).colors.text};
  height: ${StyleSheet.hairlineWidth};
  flex: 1;
`;

export const DividerWithText = styled(({ children, style }) => (
  <View style={style}>
    <Divider />
    <Headline style={{ marginHorizontal: 10 }}>{children}</Headline>
    <Divider />
  </View>
))`
  flex-direction: row;
  align-items: center;
  padding: 0 30px;
`;
