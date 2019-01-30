const reponseSuccessType = (res, payload) => {
  res.status(200).send({ success: '0000', ...payload });
};

module.exports = reponseSuccessType;
