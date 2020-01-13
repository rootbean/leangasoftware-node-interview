
const { createObjectCsvWriter } = require('csv-writer');

const { headersDataFileCSV } = require('./headers-data-file');

const { error } = console;

const csvWriter = createObjectCsvWriter({
  path: './test-file/out.csv',
  header: headersDataFileCSV,
});

exports.writeFileCSV = async (data) => {
  try {
    const result = await csvWriter.writeRecords(data);
    return result;
  } catch (ex) {
    error(`error: ${ex}`);
    throw ex;
  }
};
