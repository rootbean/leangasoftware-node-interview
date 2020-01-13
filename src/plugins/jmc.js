const mongoose = require('mongoose');
const { name, version } = require('../../package.json');

const { error } = console;

exports.plugin = {
  name: `${name}:config:mongo`,
  version,
};

exports.plugin.register = async (server, options) => {
  try {
    await mongoose.connect(options.db, options.opt);
  } catch (ex) {
    error(`error: ${ex}`);
    throw ex;
  }
};
