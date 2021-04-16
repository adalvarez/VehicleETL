import csv from "csv-parser";
import fs from "fs";

export default (filename)=>{
  return new Promise((resolve, reject)=>{
    const results = [];
    fs.createReadStream(filename)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('error', (err)=> reject(err))
      .on('end', () => {
        resolve(results);
      });
  });
}