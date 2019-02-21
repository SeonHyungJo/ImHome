const reponseErrorType = (res, type) => {
  switch (type) {
    /**
     * 로그인관련 에러코드
     */
    case 'LOGIN_FAIL':
      res.status(200).send({ fail: '0100' });
      break;
    case 'ID_INCORRECT':
      res.status(200).send({ fail: '0000' });
      break;
    case 'PASSWORD_INCORRECT':
      res.status(200).send({ fail: '0001' });
      break;
    //------------------------------------------------------

    /**
     * 회원가입관련 에러코드
     */
    case 'REGISTER_FAIL':
      res.status(200).send({ fail: '0201' });
      break;
    case 'BLANK_ID':
      res.status(200).send({ fail: '0210' });
      break;
    case 'BLANK_PASSWORD':
      res.status(200).send({ fail: '0211' });
      break;
    case 'BLANK_NAME':
      res.status(200).send({ fail: '0212' });
      break;
    case 'BLANK_BNUMBER':
      res.status(200).send({ fail: '0213' });
      break;
    case 'BLANK_BADDRESS':
      res.status(200).send({ fail: '0214' });
      break;
    case 'BLANK_CNAME':
      res.status(200).send({ fail: '0215' });
      break;
    case 'BLANK_EMAIL':
      res.status(200).send({ fail: '0216' });
      break;
    case 'BLANK_BPHONENUMBER':
      res.status(200).send({ fail: '0217' });
      break;
    case 'BLANK_BRANCHCODE':
      res.status(200).send({ fail: '0218' });
      break;
    case 'BLANK_BRANCHNAME':
      res.status(200).send({ fail: '0219' });
      break;
    case 'ALREADY_EXIST_ID':
      res.status(200).send({ fail: '0300' });
      break;
    case 'ERROR_FIND_USERID':
      res.status(200).send({ fail: '0400' });
      break;
    case 'ERROR_CHECK_BRANCH':
      res.status(200).send({ fail: '0408' });
      break;
    case 'ERROR_CREATE':
      res.status(200).send({ fail: '0500' });
      break;

    //------------------------------------------------------

    /**
     * api/check 관련 에러코드
     */
    case 'CHECK_FAIL':
      res.status(200).send({ fail: '0900' });
      break;
    case 'DONT_HAVE_TOKEN':
      res.status(200).send({ fail: '0901' });
      break;
    case 'TOKEN_INCORRECT':
      res.status(200).send({ fail: '0902' });
      break;
    //------------------------------------------------------

    case 'CREATE_USER_ERROR':
      res.status(200).send({ fail: '1001' });
      break;
    case 'NOT_FIND_USER':
      res.status(200).send({ fail: '1002' });
      break;
    case 'UPDATE_USER_ERROR':
      res.status(200).send({ fail: '1003' });
      break;
    case 'DELETE_USER_ERROR':
      res.status(200).send({ fail: '1004' });
      break;
    //------------------------------------------------------
    case 'CREATE_ODER_ERROR':
      res.status(200).send({ fail: '3001' });
      break;
    case 'NOT_FIND_ODER':
      res.status(200).send({ fail: '3002' });
      break;
    case 'UPDATE_ODER_ERROR':
      res.status(200).send({ fail: '3003' });
      break;
    case 'DELETE_ODER_ERROR':
      res.status(200).send({ fail: '3004' });
      break;
    case 'NOT_FIND_BRANCH':
      res.status(200).send({ fail: '3004' });
      break;
    case 'DONT_EXIT':
      res.status(200).send({ fail: '3009' });
      break;
    case 'AREADY_COMPLETE':
      res.status(200).send({ fail: '3010' });
      break;
    case 'CANT_FIND_PRODUCT':
      res.status(200).send({ fail: '3011' });
      break;
    case 'CREATE_PRODUCT_ERROR':
      res.status(200).send({ fail: '3012' });
      break;
    case 'UPDATE_ITEM_ERROR':
      res.status(200).send({ fail: '3013' });
      break;
    case 'DELETE_ITEM_ERROR':
      res.status(200).send({ fail: '3014' });
      break;
    case 'EXISTED_ORDER':
      res.status(200).send({ fail: '3015' });
      break;
    //------------------------------------------------------
    default:
      res.status(200).send({ fail: '9999' });
      break;
  }
};

module.exports = reponseErrorType;
