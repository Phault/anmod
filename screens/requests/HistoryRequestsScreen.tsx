import React from 'react';
import { AvailabilityFilter } from '../../types/AvailabilityFilter';
import { RequestSortOrder } from '../../types/OrderType';
import { RequestStatusFilter } from '../../types/RequestStatusFilter';
import { RequestList } from '../../components/requests/RequestList';

export const HistoryRequestsScreen = () => {
  return (
    <>
      <RequestList
        status={RequestStatusFilter.none}
        order={RequestSortOrder.requestedDateDesc}
        availability={AvailabilityFilter.none}
      />
    </>
  );
};

HistoryRequestsScreen.navigationOptions = {
  title: 'History'
};
