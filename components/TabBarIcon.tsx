import React, { useContext } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from 'styled-components';

export default function TabBarIcon(props) {
  const theme = useContext(ThemeContext);

  return (
    <MaterialIcons
      name={props.name}
      size={26}
      style={{ marginBottom: -3 }}
      color={props.focused ? theme.colors.primary : '#CFD8DC'}
    />
  );
}
