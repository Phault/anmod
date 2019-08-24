import React, { useContext } from 'react';
import {
  ThemeProvider as StyledThemeProvider,
  DefaultTheme,
  ThemeContext
} from 'styled-components';
import {
  Provider as PaperThemeProvider,
  DefaultTheme as PaperDefaultTheme,
  Theme as PaperTheme
} from 'react-native-paper';

export interface Theme extends DefaultTheme, PaperTheme {
  dark: boolean;
  roundness: number;
  colors: {
    primary: string;
    background: string;
    surface: string;
    accent: string;
    success: string;
    error: string;
    text: string;
    disabled: string;
    placeholder: string;
    backdrop: string;
  };
  fonts: {
    regular: string;
    medium: string;
    light: string;
    thin: string;
  };
}

export const defaultTheme: Theme = {
  ...PaperDefaultTheme,
  dark: true,
  roundness: 4,
  colors: {
    primary: '#D6712D',
    accent: '#5BC0DE',
    background: '#263238',
    surface: '#37474F',
    success: '#5CA37A',
    error: '#D9534F',
    text: '#ffffff',
    disabled: '#ffffff42',
    placeholder: '#ffffff8A',
    backdrop: '#00000080'
  }
};

export const ThemeProvider = ({ theme, children }) => (
  <StyledThemeProvider theme={theme}>
    <PaperThemeProvider theme={theme}>{children}</PaperThemeProvider>
  </StyledThemeProvider>
);

export function useTheme() {
  return useContext<Theme>(ThemeContext);
}
