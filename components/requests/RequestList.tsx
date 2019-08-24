import React, { useCallback, FC } from 'react';
import styled from 'styled-components/native';
import { useStores } from '../../store/StoreContext';
import { AvailabilityFilter } from '../../types/AvailabilityFilter';
import { RequestSortOrder } from '../../types/OrderType';
import { RequestStatusFilter } from '../../types/RequestStatusFilter';
import { RequestListItem } from './RequestListItem';
import { EndlessList } from '../EndlessList';
import { StyleSheet } from 'react-native';

const StyledEndlessList = styled(EndlessList).attrs({
  contentContainerStyle: { padding: 10, flexGrow: 1 }
})`
  background: ${props => props.theme.colors.background};
  flex-grow: 1;
`;

export interface RequestListProps {
  status: RequestStatusFilter;
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
      requests.movies.fetchRequests({
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
    />
  );
};

const styles = StyleSheet.create({
  item: {
    marginBottom: 10,
    borderRadius: 3,
    overflow: 'hidden'
  }
});
