const Joi = require('@hapi/joi');

exports.pagintationInmobiliariasValidate = Joi.object().keys(
  {
    page: Joi.number().optional().description('page')
      .example(1)
      .default(1),
    qtyPerPage: Joi.number().max(40).optional().description('quantity by page')
      .example(10)
      .default(10),
    priceMin: Joi.number().min(0).optional().description('precio mínimo')
      .example(20),
    priceMax: Joi.number().min(0).optional().description('precio máximo')
      .example(1000),
    rooms: Joi.number().min(0).optional().description('cantidad de habitaciones')
      .example(2),
  },
).unknown();
