import { dbConnect, dbDisconnect } from "../../src/model/DBHandler";
import Vehicle from "../../src/model/Models/Vehicle";
import MockTransformation from "../fixtures/data.transformation.json";
import { validateNotEmpty, validateMongoDuplicationError, validateVehicleSchema } from "../test-utils/validators";

describe(`Vehicle model`, ()=>{
  beforeAll(async () => dbConnect());
  afterAll(async () => dbDisconnect());

    test(`Should insert a Vehicle`, async ()=>{
      const mock = MockTransformation[0];
      const vehicle = new Vehicle({...mock});
      const vehicleOp = await vehicle.save();
      validateNotEmpty(vehicleOp);
      validateVehicleSchema(vehicleOp, mock);
    });

    test(`Should not insert a duplicated Vehicle`, async ()=>{
      const mock = MockTransformation[0];
      const vehicle = new Vehicle({...mock});
      try{
        const vehicleOp = await vehicle.save();
        validateNotEmpty(vehicleOp);
        validateVehicleSchema(vehicleOp, mock);
      }catch(err){
        const { name, code }= err;
        validateMongoDuplicationError(name, code);
      }
    });
});