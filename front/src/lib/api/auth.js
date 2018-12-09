import axios from 'axios';

export const userRegister = ({ id, password }) => //@TODO 필드 추가 필요
    axios.post('/api/register', { id, password });
export const userLogin = ({ id, password }) => axios.post('/api/login', { id, password });
export const logout = () => axios.post('/api/logout');
