
const { error } = console;

exports.convertFile = async (data = []) => {
  try {
    const result = data.map((item) => {
      const newItem = { ...item };
      newItem.location = {
        type: 'Point',
        coordinates: [Number(newItem.longitude), Number(newItem.latitude)],
      };
      newItem.price = Number(newItem.price);
      newItem.squareMeter = Number(newItem.squareMeter);
      newItem.rooms = Number(newItem.rooms);
      newItem.bathrooms = Number(newItem.bathrooms);
      newItem.priceMeter = newItem.squareMeter && newItem.squareMeter > 0
          && newItem.price ? Number((newItem.price / newItem.squareMeter).toFixed(2)) : 0;
      return newItem;
    });
    return result;
  } catch (ex) {
    error(`error: ${ex}`);
    throw ex;
  }
};
