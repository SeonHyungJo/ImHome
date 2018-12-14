import * as ApiService from './ApiService';
import axios from 'axios';

const axiosConfig = {
    headers: {
        'x-access-token': localStorage.getItem('accessToken')
    }
};

export const getCompanyList = () => ApiService.get('/api/company/list/');
export const getProducts = () => ApiService.get('/api/products/');
export const getProductData = companyCode => ApiService.get('/api/product/', companyCode);

export const createCategory = (companyCode, data) =>
    axios.post(`/api/product/${companyCode}/item`, data, axiosConfig);
