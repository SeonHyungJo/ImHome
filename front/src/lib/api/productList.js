import * as ApiService from './ApiService';

export const getCompanyList = () => ApiService.get('/api/company/list/');
export const getProducts = () => ApiService.get('/api/products/');
export const getProductData = companyCode => ApiService.get('/api/product/', companyCode);
