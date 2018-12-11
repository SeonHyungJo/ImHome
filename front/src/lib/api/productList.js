import * as ApiService from './ApiService';

export const getStoreList = () => ApiService.get('/api/store/list/');
export const getCompanyList = () => ApiService.get('/api/company/list/');
// export const getProductList = (storeId) => ApiService.get('/api/user/list/', storeId);
