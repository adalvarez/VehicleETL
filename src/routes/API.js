"use strict";

import express from "express";
import ETLRoute from "./ETL.route";

/**
 * @desc Router to handle API routes.
 * @access public
 */
let router = express.Router();

router.use("/etl", ETLRoute);

export default router;
