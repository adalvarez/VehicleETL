import uuid from "uuid-random";
import ICsvToJSON from "../utils/ICsvToJSON";
import Layouts from "../model/Layouts";
import Vehicle from "../model/Models/Vehicle";

export default class ETL{
  
  constructor(provider = "Unknown", filename = ""){
    this.provider = provider;
    this.filename = filename;
    this.layout = this.selectLayout();
  }

  static norm(value){
    return value.toLowerCase();
  }

  selectLayout(){
    const shapes = Layouts
      .filter(L=>ETL.norm(L.provider) === ETL.norm(this.provider));
    if(shapes.length === 0){
      return null;
    }else{
      // console.info(`Selecting ${shapes[0].provider} layout`);
      return shapes[0];
    }
  }

  async _getFileFields(pathToFile) {
    const fs = require('fs');
    const readline = require('readline');
    const readable = fs.createReadStream(pathToFile);
    const reader = readline.createInterface({ input: readable });
    let emptyFlag = false;
    const line = await new Promise((resolve) => {
      reader.on('line', (line) => {
        emptyFlag = !emptyFlag;
        reader.close();
        resolve(line
          .split(",")
          .map(O=>ETL.norm(O))
        );
      });
      reader.on('close', (d)=>{
        if(!emptyFlag){
          resolve([]);
        }
      });
    });
    readable.close();
    return line;
  }

  async verifyLayout(){
    if(!this.layout) return false;
    const fields = await this._getFileFields(this.filename);
    for(const Field in this.layout.columns){
      const expectedField = ETL.norm(this.layout.columns[Field].key);
      // Avoid UUID
      if(!fields.includes(expectedField)){
        console.warn(`Layout is not matching`);
        // return false;
      }
    }
    return true;
  }

  async extract(){
    const payload = await ICsvToJSON(this.filename);
    return payload;
  }

  transform(payload = []){
    const columns = this.layout.columns;
    const saveExtract = (Record, field)=>{
      const selectField = Object.keys(Record)
        .filter(R=> ETL.norm(R) === ETL.norm(field));
      if(selectField.length === 0) return null;
      let value = Record[selectField[0]];
      if(value) return value;
      return null;
    };
    return payload.map(Record=>{
      const newObject = {};
      for(const Field of Object.keys(columns)){
        newObject[Field] = saveExtract(Record, columns[Field].key)
      }
      if(!newObject[`UUID`]){
        newObject.UUID = uuid();
      }
      return newObject;
    });
  }

  async load(transformed){
    const records = [];
    for(const T of transformed){
      const vehicle = new Vehicle({...T});
      try{
        const vehicleOp = await vehicle.save();
        records.push(vehicleOp);
      }catch(err){
        if(err.code === 11000){
          console.warn(`Avoiding record, id duplicated.`);
        }
      }
    }
    return records;
  }
}