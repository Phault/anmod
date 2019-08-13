import React from 'react';
import { AvailabilityFilter } from '../../types/AvailabilityFilter';
import { RequestSortOrder } from '../../types/OrderType';
import { RequestStatusFilter } from '../../types/RequestStatusFilter';
import { ManageRequestsFab } from './ManageRequestsFab';
import { RequestList } from '../../components/requests/RequestList';

export const PendingRequestsScreen = () => {
  return (
    <>
      <RequestList
        status={RequestStatusFilter.pending}
        order={RequestSortOrder.requestedDateDesc}
        availability={AvailabilityFilter.none}
      />
      <ManageRequestsFab
        onApproveAll={() => console.log('Approve all')}
        onRejectAll={() => console.log('Reject all')}
      />
    </>
  );
};

PendingRequestsScreen.navigationOptions = {
  title: 'Pending'
};
