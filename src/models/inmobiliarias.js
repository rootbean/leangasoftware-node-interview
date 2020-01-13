const mongoose = require('mongoose');

const { Schema } = mongoose;

const InmobiliariaSchema = new Schema({
  id: { type: String, required: true },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  title: {
    type: String,
    required: [true, 'El titulo es requerido'],
  },
  advertisers: {
    type: String,
    required: [true, 'El anunciante es requerido'],
  },
  description: { type: String },
  reformed: { type: Boolean, default: false },
  phone: { type: String },
  typeA: {
    type: String,
    required: [true, 'El tipo es requerido'],
  },
  price: {
    type: Number,
    required: [true, 'El precio es requerido'],
    min: [0, 'El precio no puede ser inferior a 0'],
  },
  priceMeter: {
    type: Number,
  },
  city: {
    type: String,
    required: [true, 'La ciudad es requerida'],
  },
  province: {
    type: String,
    required: [true, 'La provincia es requerida'],
  },
  address: {
    type: String,
    required: [true, 'La dirección es requerida'],
  },
  squareMeter: {
    type: Number,
    required: [true, 'Los metros cuadrados son requeridos'],
    min: [0, 'Los metros cuadrados no pueden ser inferior a 0'],
  },
  rooms: {
    type: Number,
    required: [true, 'La cantidad de habitaciones es requerida'],
    min: [0, 'La cantidad de habitaciones no puede ser inferior a 0'],
  },
  bathrooms: {
    type: Number,
    required: [true, 'La cantidad de baños es requerida'],
    min: [0, 'La cantidad de baños no puede ser inferior a 0'],
  },
  parking: { type: Boolean, default: false },
  secondHand: { type: Boolean, default: false }, // segunda mano
  fittedWardrobes: { type: Boolean, default: false }, // armarios empotrados
  buildIn: { type: Number },
  furnished: { type: Boolean, default: false }, // amueblado
  individualHeating: { type: String }, // Calefacción individual
  energeticCertification: { type: String }, // Certificación energética
  floorNumber: { type: Number }, // planta
  exterior: { type: Boolean },
  interior: { type: Boolean },
  lift: { type: Boolean, default: false },
  registrationDate: { type: Date },
  street: { type: String },
  neighborhood: { type: String },
  district: { type: String },
  terrace: { type: Boolean, default: false },
  storageRoom: { type: Boolean, default: false },
  equippedKitchen: { type: Boolean, default: false },
  airConditioning: { type: Boolean, default: false },
  swimmingPool: { type: Boolean, default: false },
  garden: { type: Boolean, default: false },
  usefulSquareMeters: { type: Number }, // Metros cuadrados útiles
  suitablePeopleReducedMobility: {
    type: Boolean, default: false,
  }, // Apto para personas con movilidad reducida
  numberFloorsPlants: { type: Number }, // Plantas
  petsAllowed: { type: Boolean, default: false }, // se admiten mascotas
  balcony: { type: Boolean, default: false }, // balcón
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now() },

});

InmobiliariaSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Inmobiliaria', InmobiliariaSchema);
