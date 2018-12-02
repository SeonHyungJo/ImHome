import axios from 'axios';

export const getStoreList = () => axios.get('/api/store/list/');
export const getUserList = (storeId) => axios.get('/api/user/list/' + storeId);
export const getUserData = () => ({ custNo }) => axios.post('/api/user/view/', { custNo });
