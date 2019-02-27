import * as ApiService from './ApiService';

export const getStoreList = () => ApiService.get('/api/store/list/');
export const getOrderList = (storeId, startDate, endDate) => (startDate && endDate
  ? ApiService.get('/api/order/list/', `${storeId}?startDate=${startDate}&endDate=${endDate}`)
  : ApiService.get('/api/order/list/', storeId));
export const getOrderData = custNo => ApiService.get('/api/order/', custNo);
export const deleteOrderData = custNo => ApiService.del('/api/order/', custNo);
export const downloadExcel = (storeId, startDate, endDate) => (startDate && endDate
  ? ApiService.post(
    '/api/order/excel/',
    { storeId, startDate, endDate },
  )
  : ApiService.get('/api/order/excel/', storeId));