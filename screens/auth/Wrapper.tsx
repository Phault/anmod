import Constants from 'expo-constants';
import styled from 'styled-components/native';
import { Theme } from '../../Theme';

export const Wrapper = styled.View`
  padding: 20px;
  padding-top: ${Constants.statusBarHeight + 20}px;
  justify-content: center;
  align-items: stretch;
  flex: 1;
  background: ${({ theme }) => (theme as Theme).colors.background};
`;
