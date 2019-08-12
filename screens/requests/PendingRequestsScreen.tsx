import React from 'react';
import { AvailabilityFilter } from '../../types/AvailabilityFilter';
import { RequestSortOrder } from '../../types/OrderType';
import { StatusFilter } from '../../types/StatusFilter';
import { ManageRequestsFab } from './ManageRequestsFab';
import { RequestList } from '../../components/requests/RequestList';

export const PendingRequestsScreen = () => {
  return (
    <>
      <RequestList
        status={StatusFilter.pending}
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
