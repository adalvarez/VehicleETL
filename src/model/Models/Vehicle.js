import { Schema, model } from "mongoose";

const VehicleSchema = new Schema({
  UUID:{
    type: String,
    unique: true
  },
  VIN:{
    type: String,
    trim: true
  },
  MAKE:{
    type: String,
    trim: true,
  },
  MODEL:{
    type: String,
    trim: true,
  },
  MILEAGE:{
    type: Number,
  },
  YEAR:{
    type: Number,
  },
  PRICE:{
    type: Number,
  },
  ZIP_CODE:{
    type: String,
    trim: true,
  },
  CREATE_DATE:{
    type: Date,
  },
  UPDATE_DATE:{
    type: Date,
  },
}, { versionKey: false });

export default model(`Vehicle`, VehicleSchema);