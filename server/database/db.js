import mongoose from "mongoose";

export const Connection = async (username, password) => {
  const URL =  `mongodb+srv://${username}:${password}@flipkart.rb1ylc2.mongodb.net/?retryWrites=true&w=majority&appName=flipkart`
  try {
      await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser:true });
      console.log("Database connected successfully");
        
    } catch (error) {
        console.log('Error while connecting with the database', error.message);
    }
}

export default Connection

