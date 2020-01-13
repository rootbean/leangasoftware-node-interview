const DataModel = require('../../models/inmobiliarias');

const { error } = console;

exports.save = async (payload) => {
  const model = { ...payload };
  try {
    const Data = new DataModel(model);
    return await Data.save();
  } catch (ex) {
    error(`error: ${ex}`);
    throw ex;
  }
};

exports.saveMany = async (payload) => {
  try {
    const Data = new DataModel();
    return await Data.collection.insertMany(payload);
  } catch (ex) {
    error(`error: ${ex}`);
    throw ex;
  }
};

exports.findAll = async (where = {}) => {
  try {
    return await DataModel.find(where).exec();
  } catch (ex) {
    error(`error: ${ex}`);
    throw ex;
  }
};

exports.findById = async (id, where = {}) => {
  try {
    const newWhere = where;
    newWhere._id = id;
    return await DataModel.findOne(newWhere).exec();
  } catch (ex) {
    error(`error: ${ex}`);
    throw ex;
  }
};

/**
 * @description consulta con paginación
 * @param pag
 * @param cantByPage
 * @param whereQuery
 * @version 1.0
 * @author Ruber Rodríguez V
 */
exports.paginate = async (pag, cantByPage, whereQuery = {}) => {
  try {
    let priceMin = 0;
    let priceMax = 1000000;
    const page = Number(pag);
    const qtyPerPage = Number(cantByPage);
    const skip = qtyPerPage * (page - 1);

    if (whereQuery.priceMin) {
      priceMin = whereQuery.priceMin;
    }
    if (whereQuery.priceMax) {
      priceMax = whereQuery.priceMax;
    }

    const newWhere = {
      price: { $gte: priceMin, $lte: priceMax },
    };

    if (whereQuery.rooms) {
      newWhere.rooms = whereQuery.rooms;
    }
    const resultData = await DataModel.find(newWhere)
      .skip(skip)
      .limit(qtyPerPage)
      .exec();
    const count = await DataModel.countDocuments(newWhere).exec();
    const pages = Math.ceil(count / qtyPerPage);

    const result = {
      meta: {
        paging: {
          page,
          limit: qtyPerPage,
          totalPages: pages,
          count,
        },
      },
      data: resultData,
    };

    return result;
  } catch (ex) {
    error(`error: ${ex}`);
    throw ex;
  }
};

exports.averagePrice = async (where = {}) => {
  try {
    const newWhere = {
      location: {
        $nearSphere: {
          $geometry: {
            type: 'Point',
            coordinates: [where.longitude, where.latitude],
          },
          $maxDistance: where.distance * 1000,
        },
      },
    };

    const data = await DataModel.find(newWhere).exec();
    const result = data.reduce((total, item) => total + item.priceMeter, 0);
    const averagePriceMeter = data.length > 0 ? Number((result / data.length).toFixed(2)) : 0;
    return averagePriceMeter;
  } catch (ex) {
    error(`error: ${ex}`);
    throw ex;
  }
};

exports.filterLocation = async (where = {}) => {
  try {
    const newWhere = {
      location: {
        $nearSphere: {
          $geometry: {
            type: 'Point',
            coordinates: [where.longitude, where.latitude],
          },
          $maxDistance: where.distance * 1000,
        },
      },
    };

    return await DataModel.find(newWhere).exec();
  } catch (ex) {
    error(`error: ${ex}`);
    throw ex;
  }
};
