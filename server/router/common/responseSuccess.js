const reponseSuccessType = (res, type) => {
    res.status(200).send({ success: '0000' });
};

module.exports = reponseSuccessType;
