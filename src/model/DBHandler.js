import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const mongoServer = new MongoMemoryServer();

export async function dbConnect(){
  const uri = await mongoServer.getUri();
  const mongooseOpts = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };
  await mongoose.connect(uri, mongooseOpts);
};

export async function dbDisconnect(){
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
}

export async function dbClear(){
  const collections = mongoose.connection.collections;
  for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany();
  }
}