import express from "express";
import multer from "multer";
import validate from "express-validation";
import validations from "../validations/etl.val";
import ETLCtrl from "../controller/ETL.ctrl";
import VerifyMulterFile from "./middleware/VerifyMulterFile";

/**
 * @desc Router to handle etl endpoints.
 * @access public
 */
let router = express.Router();

const uploadMemory = multer({ dest: 'uploads/' });

router.get("/", validate(validations.getVehicles), ETLCtrl.getVehicles);
router.post("/", uploadMemory.single('input'), validate(validations.etl), VerifyMulterFile, ETLCtrl.process);

export default router;