
const csv = require('csvtojson');

const { error } = console;

exports.readFile = async (urlFile) => {
  try {
    const result = await csv().fromFile(urlFile);
    return result;
  } catch (ex) {
    error(`error: ${ex}`);
    throw ex;
  }
};
