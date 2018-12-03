const reponseErrorType = (res, type) => {
    switch (type) {
        case 'NOT_FIND_USER':
            res.status(500).send({ fail: '1002' });
            break;
        case 'UPDATE_ERROR':
            res.status(500).send({ fail: '1003' });
            break;
        case 'DELETE_ERROR':
            res.status(500).send({ fail: '1004' });
            break;
        default:
            break;
    }
};

module.exports = reponseErrorType;
