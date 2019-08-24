import React, { memo } from 'react';
import { FC } from 'react';
import { Paragraph, Title, Caption } from 'react-native-paper';
import { observer } from 'mobx-react-lite';
import { MediaCardProps, MediaCard } from './MediaCard';
import { SpacedRow } from './SpacedRow';
import { StyleSheet } from 'react-native';
import { getType } from 'mobx-state-tree';

export const MediaCardOverview: FC<MediaCardProps> = memo(
  observer(({ media, ...rest }) => (
    <MediaCard media={media} posterStyle={styles.poster} {...rest}>
      <SpacedRow>
        <Caption>{media.releaseDate.getFullYear()}</Caption>
        <Caption>{getType(media).name}</Caption>
      </SpacedRow>
      <Title>{media.title}</Title>
      <Paragraph numberOfLines={5}>{media.overview}</Paragraph>
    </MediaCard>
  ))
);

const styles = StyleSheet.create({
  poster: {
    width: 120
  }
});
