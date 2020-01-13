const Joi = require('@hapi/joi');

exports.inmobiliariaPayload = Joi.object().keys(
  {
    name: Joi.string().required().description('nombre').uppercase({ force: true })
      .example('free'),
    planKeyStripe: Joi.string().required().description('plan stripe')
      .example('basic_proDADSFDS1'),
    events: Joi.number().integer().required().description('cantidad de eventos')
      .example(50),
    price: Joi.number().integer().required().description('price')
      .example(5),
    active: Joi.boolean().optional().description('estado').example(true),
  },
);

exports.namePlanPayload = Joi.string().required().description('nombre').uppercase({ force: true })
  .example('free');
