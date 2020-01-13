const { name, version } = require('../../../package.json');
const dataOrm = require('../db/inmobiliarias-orm');

const { error } = console;

exports.plugin = {
  name: `${name}:methods:inmobiliarias`,
  version,
};

exports.plugin.register = async (server) => {
  server.method('saveInmobiliaria', async (payload) => {
    try {
      return await dataOrm.save(payload);
    } catch (ex) {
      error(`error: ${ex}`);
      throw ex;
    }
  });

  server.method('saveManyInmobiliarias', async (payload) => {
    try {
      return await dataOrm.saveMany(payload);
    } catch (ex) {
      error(`error: ${ex}`);
      throw ex;
    }
  });

  server.method('getInmobiliarias', async (where) => {
    try {
      return await dataOrm.findAll(where);
    } catch (ex) {
      error(`error: ${ex}`);
      throw ex;
    }
  });

  server.method('getInmobiliariaById', async (id, where) => {
    try {
      return await dataOrm.findById(id, where);
    } catch (ex) {
      error(`error: ${ex}`);
      throw ex;
    }
  });

  server.method('paginateInmobiliarias', async (pag, cantByPage, where) => {
    try {
      return await dataOrm.paginate(pag, cantByPage, where);
    } catch (ex) {
      error(`error: ${ex}`);
      throw ex;
    }
  });
};
