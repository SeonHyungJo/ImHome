import * as ApiService from './ApiService';

/**
 *  @summary 출고가 되지 않은 내역이 있는 지점 리스트 가져오기
 *  @param
 *  @returns [ {
        "_id": 주문 아이디
        "branchCode": 지점 코드,
        "branchName": 지점명,
        "updatedAt": 최근 수정 시간
    }]
 */
export const getStoreList = () => ApiService.get('/api/order/branch/incomplete/');

/**
 * @summary 해당 지점에 맞는 주문 정보 가져오기
 * @param branchCode : 가져올 지점 코드
 * @returns [ {
        "_id": 주문 아이디
        "branchCode": 지점 코드,
        "branchName": 지점명,
        "irems" [
            "itemCode" : 물품 코드
            "itemName" : 물품 이름
            "itemCount" : 물품 갯수
            "itemCost" : 물품 비용
            "itemVolume" : 물품 단위
            "itemDepth" : 왜있는 거지?
        ]
        "updatedAt": 최근 수정 시간
    }]
 */
export const getOrderData = branchCode => ApiService.get(`/api/order/${branchCode || ''}`);

/**
 * @summary 출고 완료 처리하기
 * @param branchCode : 출고처리할 지점 코드
 * @returns returnCode
 */
export const updateComplete = branchCode => ApiService.put(`/api/order/complete/${branchCode || ''}`);

/**
 * @summary 주문 취소하기
 * @param branchCode : 주문취소할 브랜치 코드
 * @returns returnCode
 */
export const deleteOrderData = branchCode => ApiService.del(`/api/order/${branchCode || ''}`);

/**
 * @author jinseong
 * @summary 주문 생성
 * @param
 *  {
        "complete": 출고처리(false),
        "branchCode": 지점 코드,
        "items" [
            "itemCode" : 물품 코드
            "itemName" : 물품 이름
            "itemCount" : 물품 갯수
            "itemCost" : 물품 비용
            "itemVolume" : 물품 단위
            "itemDepth" :
        ]
    }
 * @returns
 */
export const createOrder = data => ApiService.post('/api/order', data);
