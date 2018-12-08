import axios from 'axios';

export const getStoreList = () => axios.get('/api/store/list/');
export const getUserList = (storeId) => axios.get('/api/user/list/' + storeId);
export const getUserData = (custNo) => axios.get('/api/user/' + custNo);
export const getUserUpdateData = (custNo) => axios.get('/api/user/' + custNo);
export const updateUserData = (custNo, { branchName, name, cName, bNumber, bAddress, email, pNumber }) =>
    axios.put('/api/user/' + custNo, { branchName, name, cName, bNumber, bAddress, email, pNumber });