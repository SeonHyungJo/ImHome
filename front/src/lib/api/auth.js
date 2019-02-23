import axios from 'axios';
import * as ApiService from './ApiService';

export const userRegister = ({
  id,
  password,
  name,
  bNumber,
  bAddress,
  cName,
  email,
  bPhoneNumber,
  branchName,
}) => axios.post('/api/register', {
    id,
    password,
    name,
    bNumber,
    bAddress,
    cName,
    email,
    bPhoneNumber,
    branchName,
  });
export const userLogin = ({ id, password }) => axios.post('/api/login', { id, password });
export const logout = () => axios.post('/api/logout');
export const checkStatus = () => ApiService.get('/api/check/');
export const getStoreList = () => ApiService.get('/api/store/list/');
