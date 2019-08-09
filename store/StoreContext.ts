import React from 'react';
import { RootStore } from './RootStore';
import { Instance } from 'mobx-state-tree';

export const StoreContext = React.createContext<Instance<typeof RootStore>>(
  RootStore.create({})
);

export function useStores() {
  return React.useContext(StoreContext);
}
