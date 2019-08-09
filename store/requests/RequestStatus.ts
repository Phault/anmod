import { types } from 'mobx-state-tree';

export enum RequestStatus {
  None = 'none',
  Pending = 'pending',
  Approved = 'approved',
  Denied = 'denied'
}

export const RequestStatusType = types.enumeration<RequestStatus>(
  'RequestStatus',
  Object.values(RequestStatus)
);
