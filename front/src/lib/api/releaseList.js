import * as ApiService from './ApiService';

export const getStoreList = () => ApiService.get('/api/store/list/');
export const getOrderList = storeId => ApiService.get('/api/order/list/', storeId);
export const getOrderData = custNo => ApiService.get('/api/order/', custNo);
export const deleteOrderData = custNo => ApiService.del('/api/order/', custNo);
