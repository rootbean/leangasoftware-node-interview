const { badImplementation } = require('@hapi/boom');
const { name, version } = require('../../../package.json');
const { pagintationInmobiliariasValidate } = require('../../schemas/pagination');
const { idModel, geoModel, urlFile } = require('../../schemas/others');
const { handleError } = require('../../utils/handle-error');
const { readFile } = require('../../utils/read-file');
const { convertFile } = require('../../utils/convert-file');

const { log, error } = console;

exports.plugin = {
  name: `${name}:route:inmobiliarias`,
  version,
};

exports.plugin.register = async (server) => {

  // find all inmobiliarias
  server.route({
    path: '/inmobiliarias',
    method: 'GET',
    options: {
      description: 'Obtener los inmuebles',
      tags: ['api'],
      pre: [{
        assign: 'log',
        method: async (request) => {
          log(request.path, 'at', Date.now());
          return true;
        },
      }],
    },
    handler: async (request, h) => {
      try {
        const response = await server.methods.getInmobiliarias();
        const found = response.length >= 0;
        return h.response({ data: response, found }).code(200);
      } catch (e) {
        error('error al encontrar los inmuebles', e);
        return badImplementation('process failed');
      }
    },
  });

  // find by id
  server.route({
    path: '/inmobiliarias/{id}',
    method: 'GET',
    options: {
      description: 'Obtener inmueble por id',
      tags: ['api'],
      validate: {
        params: {
          id: idModel,
        },
        failAction: handleError,
      },
      pre: [{
        assign: 'log',
        method: async (request) => {
          log(request.path, 'at', Date.now());
          return true;
        },
      }],
    },
    handler: async (request, h) => {
      try {
        const { params } = request;
        const response = await server.methods.getInmobiliariaById(params.id);
        return h.response({ data: response, message: 'Inmueble encontrado' }).code(200);
      } catch (e) {
        error('error al encontrar el inmueble', e);
        return badImplementation('process failed');
      }
    },
  });

  // average price
  server.route({
    path: '/inmobiliarias/{latitude}/{longitude}/{distance}',
    method: 'GET',
    options: {
      description: 'Obtener precio promedio por distancia',
      tags: ['api'],
      validate: {
        params: {
          latitude: geoModel,
          longitude: geoModel,
          distance: geoModel,
        },
        failAction: handleError,
      },
      pre: [{
        assign: 'log',
        method: async (request) => {
          log(request.path, 'at', Date.now());
          return true;
        },
      }],
    },
    handler: async (request, h) => {
      try {
        const { params } = request;
        const where = {
          latitude: params.latitude,
          longitude: params.longitude,
          distance: params.distance,
        };
        const response = await server.methods.getInmobiliariaByGEO(where);
        return h.response({ averagePriceMeter: response, message: 'Promedio del precio por metro cuadrado hallado correctamente!' }).code(200);
      } catch (e) {
        error('error al encontrar el promedio', e);
        return badImplementation('process failed');
      }
    },
  });

  // Get Plan with pagination
  server.route({
    path: '/inmobiliarias/pagination',
    method: 'GET',
    options: {
      description: 'Obtener los inmuebles con paginación',
      tags: ['api'],
      validate: {
        query: pagintationInmobiliariasValidate,
        failAction: handleError,
      },
      pre: [{
        assign: 'log',
        method: async (request) => {
          log(request.path, 'at', Date.now());
          return true;
        },
      }],
    },
    handler: async (request, h) => {
      try {
        const { query } = request;
        const where = {
          priceMin: query.priceMin,
          priceMax: query.priceMax,
          rooms: query.rooms,
        };
        const response = await server.methods
          .paginateInmobiliarias(query.page, query.qtyPerPage, where);
        const found = response && response.data && response.data.length > 0;
        return h.response({ response, found }).code(200);
      } catch (e) {
        error('Error al obtener los inmuebles', e);
        return badImplementation('process failed');
      }
    },
  });

  // read file
  server.route({
    path: '/inmobiliarias/read-file',
    method: 'POST',
    options: {
      description: 'Leer datos de archivo y guardar',
      tags: ['api'],
      validate: {
        payload: { urlFile },
        failAction: handleError,
      },
      pre: [{
        assign: 'log',
        method: async (request) => {
          log(request.path, 'at', Date.now());
          return true;
        },
      }],
    },
    handler: async (request, h) => {
      try {
        const { payload } = request;
        const data = await readFile(payload.urlFile);
        const newData = await convertFile(data);
        await server.methods.saveManyInmobiliarias(newData);
        return h.response({ message: 'Los inmuebles se guardaron correctamente!' }).code(200);
      } catch (e) {
        error('Error al guardar los inmuebles', e);
        return badImplementation('process failed');
      }
    },
  });
};
