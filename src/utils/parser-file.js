
const { error } = console;

exports.parserFile = async (data = []) => {
  try {
    const result = data.map((item) => {
      const newItem = item;
      newItem.longitude = item.location.coordinates[0];
      newItem.latitude = item.location.coordinates[1];
      return newItem;
    });
    return result;
  } catch (ex) {
    error(`error: ${ex}`);
    throw ex;
  }
};
