import Vehicle from "../model/Models/Vehicle";
import ETL from "./ETL";

export default class ETLController{
  static async getVehicles(req, res){
    res.send(await Vehicle.find());
  }

  static async process(req, res){
    const provider = req.body.provider;
    const etl = new ETL(provider, req.file.path);
    if(!etl.verifyLayout()){
      return res.send("Invalid provider, we could not find any layout.");
    }
    const original = await etl.extract();
    const transformed = etl.transform(original);
    const result = await etl.load(transformed);
    res.send({
      success: true,
      imported_data: result
    });
  }

}