import * as ApiService from './ApiService';

// 품목관리 Nav
export const getProductNav = () => ApiService.get('/api/company/list/');

// 주문내역 Nav
export const getOrdertNav = () => ApiService.get('/api/order/branch/incomplete/');

// 출고내역조회, 회원정보 Nav
export const getAllNav = () => ApiService.get('/api/store/list/');
