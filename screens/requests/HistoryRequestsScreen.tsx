import React from 'react';
import { AvailabilityFilter } from '../../types/AvailabilityFilter';
import { RequestSortOrder } from '../../types/OrderType';
import { StatusFilter } from '../../types/StatusFilter';
import { RequestList } from '../../components/requests/RequestList';

export const HistoryRequestsScreen = () => {
  return (
    <>
      <RequestList
        status={StatusFilter.none}
        order={RequestSortOrder.requestedDateDesc}
        availability={AvailabilityFilter.none}
      />
    </>
  );
};

HistoryRequestsScreen.navigationOptions = {
  title: 'History'
};
