import ETL from "../../src/controller/ETL";
import Unknown from "../../src/model/Layouts/Unknown";
import MockExtraction from "../fixtures/data.extraction.json";
import MockTransformation from "../fixtures/data.transformation.json";
import { dbConnect, dbDisconnect } from "../../src/model/DBHandler";
import Vehicle from "../../src/model/Models/Vehicle";
import { validateVehicleSchema } from "../test-utils/validators"

describe(`ETL Class.`, ()=>{
  
  test(`Create new instance of ETL.`, ()=>{
    const payload = {
      provider: `Unknown`,
      file: `tests/fixtures/data.csv`
    }
    const etl = new ETL(...Object.values(payload));
    expect(etl.provider).toBe(payload.provider);
    expect(etl.filename).toBe(payload.file);
  });

  test(`Normalization string function.`, ()=>{
    const payload = `HelloWorld`;
    const expected = `helloworld`;
    const actual = ETL.norm(payload);
    expect(actual).toBe(expected);
  });

  test(`Select Unknown (default) Layout.`, ()=>{
    const payload = {
      provider: `Unknown`,
      file: `tests/fixtures/data.csv`
    }
    const etl = new ETL(...Object.values(payload));
    const expected = Unknown;
    const actual = etl.selectLayout();
    expect(actual).toEqual(expected);
  });

  test(`Unable to find layout for provider.`, ()=>{
    const payload = {
      provider: `AJMotors`,
      file: `tests/fixtures/data.csv`
    }
    const etl = new ETL(...Object.values(payload));
    const expected = null;
    const actual = etl.selectLayout();
    expect(actual).toEqual(expected);
  });


  test(`Look up at fields of csv file in list norm format`, async ()=>{
    const payload = {
      provider: `AJMotors`,
      file: `tests/fixtures/data.csv`
    }
    const etl = new ETL(...Object.values(payload));
    const expected = ["uuid","vin","make","model","mileage","year","price","zip_code","create_date","update_date"];
    const actual = await etl._getFileFields(payload.file);
    expect(actual).toEqual(expected);
  });

  test(`Look up at empty file`, async ()=>{
    const payload = {
      provider: `AJMotors`,
      file: `tests/fixtures/data.empty.csv`
    }
    const etl = new ETL(...Object.values(payload));
    const expected = [];
    const actual = await etl._getFileFields(payload.file);
    expect(actual).toEqual(expected);
  });

  test(`Verify layout successfully.`, async ()=>{
    const payload = {
      provider: `Unknown`,
      file: `tests/fixtures/data.csv`
    }
    const etl = new ETL(...Object.values(payload));
    const actual = await etl.verifyLayout();
    expect(actual).toBeTruthy();
  });

  test.skip(`Verify layout with mismatching.`, async ()=>{
  });

  test(`ETL:func: Extract`, async ()=>{
    const payload = {
      provider: `Unknown`,
      file: `tests/fixtures/data.csv`
    }
    const etl = new ETL(...Object.values(payload));
    const actual = await etl.extract();
    expect(actual instanceof Array).toBeTruthy();
    expect(actual).toHaveLength(1);
    for(const actualObject of actual){
      expect(actualObject instanceof Object).toBeTruthy();
      expect(Object.keys(actualObject)).toHaveLength(10);
    }
  });

  test(`ETL:func: Transform`, ()=>{
    const payload = {
      provider: `Unknown`,
      file: `tests/fixtures/data.csv`
    }
    const etl = new ETL(...Object.values(payload));
    const actual = etl.transform(MockExtraction);
    const Layout = Unknown;
    expect(actual instanceof Array).toBeTruthy();
    expect(actual).toHaveLength(1);
    for(const actualObject of actual){
      expect(actualObject instanceof Object).toBeTruthy();
      expect(Object.keys(actualObject)).toHaveLength(10);
      // Match Object interface
      const actualInterface = Object.keys(actualObject);
      const expectedInterface = Object.keys(Layout.columns);
      expect(actualInterface).toEqual(expectedInterface);
    }
  });

  test(`ETL:func: Load`, async ()=>{
    const payload = {
      provider: `Unknown`,
      file: `tests/fixtures/data.csv`
    }
    const etl = new ETL(...Object.values(payload));
    dbConnect();
    const actual = await etl.load(MockTransformation);
    expect(actual instanceof Array).toBeTruthy();
    expect(actual).toHaveLength(MockTransformation.length);
    // Inspect first element
    for(const actualVehicle of actual){
      expect(actualVehicle instanceof Vehicle).toBeTruthy();
    }
    // Get data from db
    const vehicles = await Vehicle.find();
    expect(vehicles).toHaveLength(MockTransformation.length);
    for(const [index, object] of vehicles.entries()){
      const vehicle = {...object._doc};
      validateVehicleSchema(vehicle, MockTransformation[index]);
    }
    dbDisconnect();
  });

});