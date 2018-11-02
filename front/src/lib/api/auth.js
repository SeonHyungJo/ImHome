import axios from 'axios';

export const userRegister = ({ custEmail, custPasswd }) => //@TODO 필드 추가 필요
    axios.post('/excenter/api/customer/register', { custEmail, custPasswd });
export const userLogin = ({ custId, custPasswd }) => axios.post('/excenter/api/customer/login', { custId, custPasswd });
export const logout = () => axios.post('/excenter/api/auth/logout');
