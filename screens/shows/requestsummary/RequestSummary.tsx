import React, { FC } from 'react';
import { List, Surface, TouchableRipple, Text } from 'react-native-paper';
import { observer } from 'mobx-react-lite';
import { Instance, getParentOfType } from 'mobx-state-tree';
import { StatusIcon } from '../../../components/StatusIcon';
import { StyleSheet, View, ViewStyle, StyleProp } from 'react-native';
import { ShowChildRequest } from '../../../store/requests/shows/ShowChildRequest';
import { ShowRequest } from '../../../store/requests/shows/ShowRequest';
import { pluralize } from '../../../utils/pluralize';

export interface RequestSummaryProps {
  request: Instance<typeof ShowChildRequest>;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const RequestSummary: FC<RequestSummaryProps> = observer(
  ({ request, onPress, style }) => (
    <Surface style={style}>
      <TouchableRipple onPress={onPress}>
        <View style={styles.container}>
          <View style={styles.left}>
            <Text>
              {request.episodeCount}{' '}
              {pluralize(request.episodeCount, 'episode', 'episodes')}
            </Text>
            <Text>
              {request.seasonCount}{' '}
              {pluralize(request.seasonCount, 'season', 'seasons')}
            </Text>
          </View>
          <StatusIcon
            status={
              getParentOfType(request, ShowRequest).show.available
                ? 'available'
                : request.status
            }
            size={33}
          />
          <View style={styles.right}>
            <Text>{request.requestedBy.username}</Text>
            <Text>{request.requestedDate.toLocaleDateString()}</Text>
          </View>
        </View>
      </TouchableRipple>
    </Surface>
  )
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 8
  },
  left: { flex: 1 },
  right: { flex: 1, alignItems: 'flex-end' }
});
