const mongoose = require("mongoose")


// _id: {
//   type: String,
//   requied: true,
//   unique: true
// },
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
  },
  mail: {
    type: String,
    required: true,
    unique: true,

  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Usermodel', userSchema);



