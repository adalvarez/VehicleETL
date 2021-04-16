exports.validateNotEmpty = (received) => {
  expect(received).not.toBeNull();
  expect(received).not.toBeUndefined();
  expect(received).toBeTruthy();
};

exports.validateMongoDuplicationError = (name, code) => {
  expect(name).toEqual('MongoError');
  expect(code).not.toBe(255);
  expect(code).toBe(11000);
};

exports.validateVehicleSchema = (received, test)=>{
  expect(received).toHaveProperty(`UUID`);
  expect(received.UUID).toBe(test.UUID);
  expect(received).toHaveProperty(`VIN`);
  expect(received.VIN).toBe(test.VIN);
  expect(received).toHaveProperty(`MAKE`);
  expect(received.MAKE).toBe(test.MAKE);
  expect(received).toHaveProperty(`MODEL`);
  expect(received.MODEL).toBe(test.MODEL);
  expect(received).toHaveProperty(`MILEAGE`);
  expect(received.MILEAGE).toBe(parseInt(test.MILEAGE));
  expect(received).toHaveProperty(`YEAR`);
  expect(received.YEAR).toBe(parseInt(test.YEAR));
  expect(received).toHaveProperty(`PRICE`);
  expect(received.PRICE).toBe(parseInt(test.PRICE));
  expect(received).toHaveProperty(`ZIP_CODE`);
  expect(received.ZIP_CODE).toBe(test.ZIP_CODE);
  expect(received).toHaveProperty(`CREATE_DATE`);
  expect(received.CREATE_DATE).not.toBeNull(); 
  expect(received).toHaveProperty(`UPDATE_DATE`);
  expect(received.UPDATE_DATE).not.toBeNull();
}