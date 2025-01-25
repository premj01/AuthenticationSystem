const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require('../model/user.model')


// let salt = bcrypt.genSaltSync(10);

// bcrypt.genSalt(13, function (err, salt) {

//   console.log(salt);

//   bcrypt.hash("premJadhavBro", salt, async function (err, hash) {
//     const user = new User({
//       userName: "Prem Jadhav",
//       mail: 'premj12@gmail.com',
//       password: hash,
//     })
//     try {
//       await user.save();
//       console.log("user created Successfully " + user.userName);

//     } catch (error) {
//       console.log(error.errorResponse.code);
//       console.log("user not created : " + user.userName);
//     }
//   });
// });



// const prem = async () => {
//   const obj = await User.findOne({ mail: 'premj12@gmail.com' })

//   if (obj) {
//     bcrypt.compare("premJadhavBro", obj.password).then((res) => {
//       res ? console.log("Nice dude") : console.log("fuck you")

//     });

//   } else {
//     console.log("user not valid ");

//   }



// }

// prem();

// bcrypt.compare("B4c0/\/", hash).then((res) => {
//   // res === true
// });



const varifyUser = (req, res, next) => {

}

const register = (req, res, next) => {
  const { username, email, } = req.body
}

const validOTP = (req, res, next) => {

}

const signIn = (req, res, next) => {

}

const signOut = (req, res, next) => {

}