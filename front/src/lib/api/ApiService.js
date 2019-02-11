import axios from 'axios';

const axiosConfig = () => ({
  headers: {
    'x-access-token': localStorage.getItem('accessToken'),
  },
});

export function get(path, data) {
  const requestData = data || '';
  return axios.get(path + requestData, axiosConfig());
}

export function post(path, data) {
  const requestData = data || '';
  return axios.post(path, requestData, axiosConfig());
}

export function put(path, id = '', data) {
  return axios.put(path + id, data, axiosConfig());
}

export function del(path, id = '', data) {
  console.log(axiosConfig());
  return axios.delete(path + id, data, axiosConfig());
}
