"use strict";

import Joi from "joi";

export default {
  etl: {
    params: {},
    query: {},
    body: {
      provider: Joi.string().required()
    }
  },
  getVehicles:{
    params: {},
    query: {},
    body: {}
  }
}