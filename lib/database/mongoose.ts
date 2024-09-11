import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

//since nextjs is based servel less architurce ie each api call create an instance and exit the server no persistent connection that is why we have to optimize the database connection as if there are any global connection of database present and connect else create new instance of connection ie caching

//no persistent connection is an advantage of nextjs modular and scalable nature

//it is server less connection to database
interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;
  if (!MONGODB_URL) throw new Error("Missing MONGODB URL");

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URL, {
      dbName: "picgenie",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;
  return cached.conn;
};
