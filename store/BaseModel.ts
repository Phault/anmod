import { types } from 'mobx-state-tree';

export const BaseModel = types.model({
  lastUpdated: types.optional(types.Date, () => Date.now())
});
