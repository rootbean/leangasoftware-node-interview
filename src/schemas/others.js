const Joi = require('@hapi/joi');

const jwtExp = new RegExp('^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$');

exports.idModel = Joi.string().required().description('id')
  .example('asdasdsaasasdds');

exports.urlFile = Joi.string().required().description('url de archivo')
  .example('http://localhost:3001/file.csv');

exports.headersPayload = Joi.object().keys(
  {
    authorization: Joi.string().regex(jwtExp).required().description('token user'),
  },
).unknown();
