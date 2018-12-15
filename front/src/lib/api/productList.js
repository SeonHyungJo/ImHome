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

export const createItem = (companyCode, data) =>
    axios.post(`/api/product/${companyCode}/item`, data, axiosConfig);
export const deleteItem = (companyCode, data) =>
    axios.delete(`/api/product/${companyCode}/item`, { data: data }, axiosConfig);
export const updateItem = (companyCode, data) =>
    axios.put(`/api/product/${companyCode}/item`, data, axiosConfig);
