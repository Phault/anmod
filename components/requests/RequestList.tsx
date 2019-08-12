import React, { useCallback, FC } from 'react';
import styled from 'styled-components/native';
import { useStores } from '../../store/StoreContext';
import { AvailabilityFilter } from '../../types/AvailabilityFilter';
import { RequestSortOrder } from '../../types/OrderType';
import { StatusFilter } from '../../types/StatusFilter';
import { RequestListItem } from './RequestListItem';
import { EndlessList } from '../EndlessList';
import { StyleSheet, View } from 'react-native';
import { Subheading } from 'react-native-paper';

const StyledEndlessList = styled(EndlessList).attrs({
  contentContainerStyle: { padding: 10, flexGrow: 1 }
})`
  background: ${props => props.theme.colors.background};
  flex-grow: 1;
`;

export interface RequestListProps {
  status: StatusFilter;
  order: RequestSortOrder;
  availability: AvailabilityFilter;
}

const itemRenderer = ({ item }) => (
  <RequestListItem request={item} style={styles.item} />
);

const keyExtractor = item => item.id.toString();

export const RequestList: FC<RequestListProps> = ({
  status,
  order,
  availability
}) => {
  const { requests } = useStores();
  const fetchItems = useCallback(
    (count, position) =>
      requests.fetchMovieRequests({
        count,
        position,
        status,
        order,
        availability
      }),
    [requests, status, order, availability]
  );

  return (
    <StyledEndlessList
      keyExtractor={keyExtractor}
      renderItem={itemRenderer}
      fetchItems={fetchItems}
      ListEmptyComponent={ListEmptyComponent}
    />
  );
};

const ListEmptyComponent = () => (
  <View style={styles.emptyContainer}>
    <Subheading>There's nothing here...</Subheading>
  </View>
);

const styles = StyleSheet.create({
  item: {
    marginBottom: 10,
    borderRadius: 3,
    overflow: 'hidden'
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject
  }
});
