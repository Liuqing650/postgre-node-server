
import { toJS } from 'mobx';
import clientStore, { ClientStoreClass } from './client';

export const serverCreateStore = () => {
  return {
    clientStore: new ClientStoreClass(),
  }
};
export const clientCreateStore = () => ({
  clientStore,
});
