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
