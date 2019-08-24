import React, { FC } from 'react';
import { List } from 'react-native-paper';
import { observer } from 'mobx-react-lite';
import { Instance } from 'mobx-state-tree';
import { Episode } from '../../../store/media/shows/Episode';
import { StatusIcon } from '../../../components/StatusIcon';
import { StyleSheet } from 'react-native';

export interface EpisodeListItemProps {
  episode: Instance<typeof Episode>;
}

export const EpisodeListItem: FC<EpisodeListItemProps> = observer(
  ({ episode }) => (
    <List.Item
      title={`${episode.number.toString().padStart(2, '0')}. ${episode.title}`}
      description={episode.airDate.toLocaleDateString()}
      right={() => (
        <StatusIcon
          status={episode.available ? 'available' : episode.requestStatus}
          style={styles.icon}
        />
      )}
      style={styles.episode}
    />
  )
);

const styles = StyleSheet.create({
  episode: {
    backgroundColor: 'rgba(255, 255, 255, 0.09)'
  },
  icon: {
    marginHorizontal: 6
  }
});
