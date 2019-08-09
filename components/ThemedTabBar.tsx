import React, { useContext } from 'react';
import { BottomTabBar } from 'react-navigation';
import { ThemeContext } from 'styled-components';

export const ThemedTabBar = props => {
  const theme = useContext(ThemeContext);

  return (
    <BottomTabBar
      activeTintColor={theme.colors.primary}
      inactiveTintColor="#CFD8DC"
      pressColor={theme.colors.primary}
      style={{ backgroundColor: theme.colors.surface }}
      indicatorStyle={{
        backgroundColor: theme.colors.primary
      }}
      {...props}
    />
  );
};
