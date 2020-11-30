import url from 'url';
import { Db, MongoClient } from 'mongodb';

const uri =
  process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/idlescape-utils?retryWrites=true&w=majority';

let cachedDb: Db;

export const connectToDatabase = async () => {
  if (cachedDb == null) {
    const client = await MongoClient.connect(uri, { useNewUrlParser: true });
    cachedDb = client.db(url.parse(uri).pathname!.substr(1));
  }
  return cachedDb;
};
