import React, { FC } from 'react';
import { Surface } from 'react-native-paper';
import { observer } from 'mobx-react-lite';
import { Instance } from 'mobx-state-tree';
import { Show } from '../../../store/media/shows/Show';
import { SeasonListItem } from './SeasonListItem';
import { ViewStyle, StyleProp } from 'react-native';

export interface SeasonListProps {
  show: Instance<typeof Show>;
  style?: StyleProp<ViewStyle>;
}

export const SeasonList: FC<SeasonListProps> = observer(({ show, style }) => (
  <Surface style={style}>
    {show.seasons.map(s => (
      <SeasonListItem key={s.number} season={s} />
    ))}
  </Surface>
));
