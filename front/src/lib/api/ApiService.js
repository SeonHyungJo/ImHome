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

// 2019. 2. 24 delete data삭제 - jinseong
// axios에 data는 put, post, patch에만 존재
export function del(path, id = '') {
  return axios.delete(path + id, axiosConfig());
}
