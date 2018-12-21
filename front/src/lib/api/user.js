import * as ApiService from './ApiService'


export const getStoreList = () => ApiService.get('/api/store/list/');
export const getUserList = (storeId) => ApiService.get('/api/user/list/', storeId);
export const getUserData = (custNo) => ApiService.get('/api/user/', custNo);
export const getUserUpdateData = (custNo) => ApiService.get('/api/user/', custNo);
export const updateUserData = (custNo, { branchName, name, cName, bNumber, bAddress, email, pNumber, bPhoneNumber }) =>
    ApiService.put('/api/user/', custNo, { branchName, name, cName, bNumber, bAddress, email, pNumber, bPhoneNumber });
export const deleteUserData = (custNo) => ApiService.del('/api/user/', custNo);
