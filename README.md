# VehicleETL
Coding Challenge

## Environment required variables

```shell
NODE_ENV=<environment {dev, prod, test}>
PORT=Number
MONGOMS_DOWNLOAD_URL=https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-ubuntu1804-4.2.8.tgz
MONGOMS_VERSION=4.2.8
```
To run locally, create a file on main folder of the processes module with the previous content and `.env` as filename.

## Commands

* `$ npm run start:dev` Deploys a dev environment with Nodemon.
* `$ npm run build` Transpiles all the source code and generates a distributable folder.
* `$ npm run start` Initializes an instance of this API.
* `$ npm run test` Test the module.
* `$ npm run clean` Clean build.
* `$ npm run build-babel` Generate babel build.

## Usage

Endpoints for publisher API:

> To submit a file to process:
> POST http://localhost:8081/api/etl
> Payload format of:
```javascript
{
    "input":,               // File to process - required
    "provider":             // String - required ["Unknown", "ABCMotors", "FGEMotors"]
}
```
> Returns:
```javascript
{
    "success":,             // Bool, true if the request was accepted, false if error
    "imported_data": [
      {
          "_id": ,          // ObjectId
          "UUID": ,         // String
          "VIN": ,          // String
          "MAKE": ,         // String
          "MODEL": ,        // String
          "MILEAGE": ,      // Number
          "YEAR": ,         // Number
          "PRICE": ,        // Number
          "ZIP_CODE": ,     // String
          "CREATE_DATE":,   // Date
          "UPDATE_DATE":,   // Date
      }
    ],
}
```

> Hack to get database dump:
> GET http://localhost:8081/api/etl
> Returns:
```javascript
[
  {
      "_id": ,          // ObjectId
      "UUID": ,         // String
      "VIN": ,          // String
      "MAKE": ,         // String
      "MODEL": ,        // String
      "MILEAGE": ,      // Number
      "YEAR": ,         // Number
      "PRICE": ,        // Number
      "ZIP_CODE": ,     // String
      "CREATE_DATE":,   // Date
      "UPDATE_DATE":,   // Date
  }
],
```

## CSV file expectations

#### Unknown

> UUID,VIN,Make,Model,Mileage,Year,Price,Zip_Code,Create_Date,Update_Date

#### ABCMotors
> UUID,VIN,Make,Model,Mileage,Year,Price,Zip Code,Create Date,Update Date

### EFGMotors
> id,vin,make,model,mileage,year,cost

## Assumptions
* A file should not be rejected because of its shape. This means if a file does not have alternative fields it will add an id in case the UUID does not come.