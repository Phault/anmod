import React, { FC, memo } from 'react';
import { StyleSheet, StyleProp, ViewStyle, View } from 'react-native';
import { Title, Subheading, Caption, Paragraph } from 'react-native-paper';
import { observer } from 'mobx-react-lite';
import { Instance } from 'mobx-state-tree';
import { Issue } from '../../store/issues/Issue';
import { MediaCard } from '../MediaCard';
import { SpacedRow } from '../SpacedRow';

export interface IssueListItemProps {
  issue: Instance<typeof Issue>;
  onPress?: () => any;
  style?: StyleProp<ViewStyle>;
}

export const IssueListItem: FC<IssueListItemProps> = memo(
  observer(({ issue, onPress, style }) => (
    <MediaCard media={issue.media} onPress={onPress} style={style}>
      <SpacedRow>
        <Caption>{issue.author.username}</Caption>
        <Caption>{issue.category.value}</Caption>
      </SpacedRow>
      <Title numberOfLines={1} style={styles.title}>
        {issue.media.title}
      </Title>
      <Subheading style={issue.subject ? undefined : styles.fadedText}>
        {issue.subject || 'No title'}
      </Subheading>
      <Paragraph style={issue.description ? undefined : styles.fadedText}>
        {issue.description || 'No description'}
      </Paragraph>
    </MediaCard>
  ))
);

export const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    lineHeight: 24
  },
  fadedText: {
    color: 'rgba(255,255,255,0.5)'
  }
});
