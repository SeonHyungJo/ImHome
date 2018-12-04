const reponseErrorType = (res, type) => {
    switch (type) {
        case 'LOGIN_FAIL':
            res.status(500).send({ fail: '0001' });
            break;
        case 'REGISTER_FAIL':
            res.status(500).send({ fail: '0002' });
            break;
        case 'NOT_LOGIN':
            res.status(500).send({ fail: '1009' });
            break;
        //------------------------------------------------------
        case 'CREATE_USER_ERROR':
            res.status(500).send({ fail: '1001' });
            break;
        case 'NOT_FIND_USER':
            res.status(500).send({ fail: '1002' });
            break;
        case 'UPDATE_USER_ERROR':
            res.status(500).send({ fail: '1003' });
            break;
        case 'DELETE_USER_ERROR':
            res.status(500).send({ fail: '1004' });
            break;
        //------------------------------------------------------
        case 'CREATE_ODER_ERROR':
            res.status(500).send({ fail: '3001' });
            break;
        case 'NOT_FIND_ODER':
            res.status(500).send({ fail: '3002' });
            break;
        case 'UPDATE_ODER_ERROR':
            res.status(500).send({ fail: '3003' });
            break;
        case 'DELETE_ODER_ERROR':
            res.status(500).send({ fail: '3004' });
            break;
        //------------------------------------------------------
        default:
            res.status(500).send({ fail: '9999' });
            break;
    }
};

module.exports = reponseErrorType;