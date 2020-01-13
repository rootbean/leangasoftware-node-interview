
const { error } = console;

exports.convertFile = async (data = []) => {
  try {
    const result = data.map((item) => {
      const newItem = { ...item };
      newItem.location = {
        type: 'Point',
        coordinates: [newItem.longitude, newItem.latitude],
      };
      newItem.priceMeter = newItem.squareMeter && newItem.squareMeter > 0
          && newItem.price ? (newItem.price / newItem.squareMeter).toFixed(2) : 0;
      return newItem;
    });
    return result;
  } catch (ex) {
    error(`error: ${ex}`);
    throw ex;
  }
};
