import React, { FC, useState, useCallback } from 'react';
import { List } from 'react-native-paper';
import { observer } from 'mobx-react-lite';
import { Instance } from 'mobx-state-tree';
import { ShowSeason } from '../../../store/media/shows/ShowSeason';
import { EpisodeListItem } from './EpisodeListItem';

export interface SeasonListItemProps {
  season: Instance<typeof ShowSeason>;
}

export const SeasonListItem: FC<SeasonListItemProps> = observer(
  ({ season }) => {
    const [expanded, setExpanded] = useState(false);

    const onPress = useCallback(() => setExpanded(expanded => !expanded), [
      setExpanded
    ]);

    return (
      <List.Accordion
        title={`Season ${season.number}`}
        expanded={expanded}
        onPress={onPress}>
        {expanded
          ? season.episodes.map(e => (
              <EpisodeListItem key={e.number} episode={e} />
            ))
          : null}
      </List.Accordion>
    );
  }
);
