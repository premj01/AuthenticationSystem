const mongoose = require('mongoose');

const ConnectDB = (db) => {
  try {
    mongoose.connect(db).then(() => {
      console.log("Connected to DB successfully");
    })
  } catch (error) {
    console.log(error);
  }
}

module.exports = ConnectDB;