import * as ApiService from './ApiService';

export const getStoreList = () => ApiService.get('/api/store/list/');
export const getOrderList = (storeId, startDate, endDate) => (startDate && endDate
  ? ApiService.get(
    '/api/order/list/',
    `${storeId}?startDate=${startDate.toString()}&endDate=${endDate.toString()}`,
  )
  : ApiService.get('/api/order/list/', storeId));
export const getOrderData = custNo => ApiService.get('/api/order/', custNo);
export const deleteOrderData = custNo => ApiService.del('/api/order/', custNo);
