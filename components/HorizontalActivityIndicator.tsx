import React, { useContext } from 'react';
import { ProgressBarAndroid } from 'react-native';
import { ThemeContext } from 'styled-components';

export const HorizontalActivityIndicator = props => {
  const theme = useContext(ThemeContext);
  return (
    <ProgressBarAndroid
      indeterminate
      styleAttr="Horizontal"
      color={theme.colors.primary}
      {...props}
    />
  );
};
