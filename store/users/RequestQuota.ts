import { types } from 'mobx-state-tree';

export const RequestQuota = types.model('RequestQuota', {
  limit: types.integer,
  remaining: types.integer,
  nextRequest: types.Date
});
