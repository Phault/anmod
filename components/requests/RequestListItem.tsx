import React, { FC, memo } from 'react';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Title, Caption } from 'react-native-paper';
import { observer } from 'mobx-react-lite';
import { Instance } from 'mobx-state-tree';
import { MovieRequest } from '../../store/requests/movies/MovieRequest';
import { InfoLine } from '../InfoLine';
import { MediaCard } from '../MediaCard';
import { SpacedRow } from '../SpacedRow';

export interface RequestListItemProps {
  request: Instance<typeof MovieRequest>;
  onPress?: () => any;
  style?: StyleProp<ViewStyle>;
}

export const RequestListItem: FC<RequestListItemProps> = memo(
  observer(({ request, onPress, style }) => (
    <MediaCard media={request.movie} onPress={onPress} style={style}>
      <SpacedRow>
        <Caption>{request.movie.releaseDate.getFullYear()}</Caption>
        <Caption>Movie</Caption>
      </SpacedRow>
      <Title numberOfLines={1} style={styles.title}>
        {request.movie.title}
      </Title>
      <InfoLine icon="person">{request.requestedBy.username}</InfoLine>
      <InfoLine icon="access-time">
        {request.requestedDate.toLocaleDateString()}{' '}
        {request.requestedDate.toLocaleTimeString()}
      </InfoLine>
      {/* <InfoLine icon="info">8 episodes from 2 seasons</InfoLine> */}
    </MediaCard>
  ))
);

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    lineHeight: 24
  }
});
