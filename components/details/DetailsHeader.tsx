import React, { FC } from 'react';
import { Instance } from 'mobx-state-tree';
import { observer } from 'mobx-react-lite';
import { View } from 'react-native';
import { Poster } from '../Poster';
import { AnyMedia } from '../../store/media/AnyMedia';
import styled from 'styled-components/native';

const HeadingContainer = styled.View.attrs({
  pointerEvents: 'none'
})`
  padding: 12px;
  padding-bottom: 0px;
  flex: 1;
`;

export interface DetailsHeaderProps {
  media: Instance<typeof AnyMedia>;
}

export const DetailsHeader: FC<DetailsHeaderProps> = observer(
  ({ media, children }) => (
    <View
      style={{
        flexDirection: 'row',
        marginBottom: 12
      }}>
      <Poster
        media={media}
        style={{
          marginTop: -150 / 3
        }}
        height={150}
      />
      <HeadingContainer>{children}</HeadingContainer>
    </View>
  )
);
