import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Appbar } from 'react-native-paper';

export const ThemedAppbarAction = props => {
  const theme = useContext(ThemeContext);
  return <Appbar.Action color={theme.dark ? 'white' : 'black'} {...props} />;
};
