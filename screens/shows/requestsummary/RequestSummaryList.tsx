import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Instance } from 'mobx-state-tree';
import { ShowRequest } from '../../../store/requests/shows/ShowRequest';
import { RequestSummary } from './RequestSummary';
import { StyleSheet, StyleProp, ViewStyle, View } from 'react-native';

export interface RequestSummaryListProps {
  request: Instance<typeof ShowRequest>;
  style?: StyleProp<ViewStyle>;
}

export const RequestSummaryList: FC<RequestSummaryListProps> = observer(
  ({ request, style }) => (
    <View style={style}>
      {request.childRequests.map(r => (
        <RequestSummary
          key={r.id}
          request={r}
          style={styles.item}
          onPress={() => {}}
        />
      ))}
    </View>
  )
);

const styles = StyleSheet.create({
  item: {
    marginBottom: 2
  }
});
