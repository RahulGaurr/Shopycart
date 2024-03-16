import mongoose from "mongoose";

export const Connection = async (username, password) => {
  const URL =  `mongodb://${username}:${password}@ac-obifvgc-shard-00-00.vjt5ces.mongodb.net:27017,ac-obifvgc-shard-00-01.vjt5ces.mongodb.net:27017,ac-obifvgc-shard-00-02.vjt5ces.mongodb.net:27017/?ssl=true&replicaSet=atlas-llaqji-shard-0&authSource=admin&retryWrites=true&w=majority`
  try {
      await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser:true });
      console.log("Database connected successfully");
        
    } catch (error) {
        console.log('Error while connecting with the database', error.message);
    }
}

export default Connection