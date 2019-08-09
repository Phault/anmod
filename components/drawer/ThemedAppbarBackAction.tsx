import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Appbar } from 'react-native-paper';

export const ThemedAppbarBackAction = props => {
  const theme = useContext(ThemeContext);

  return (
    <Appbar.BackAction color={theme.dark ? 'white' : 'black'} {...props} />
  );
};
