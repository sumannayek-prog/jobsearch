const mongoose = require('mongoose')

const connectDB = async ()=>{
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log(`Connected with MongoDB database`);
  } catch (error) {
    console.log(`Error in MongoDB database${error}`);
  }
}

module.exports = connectDB