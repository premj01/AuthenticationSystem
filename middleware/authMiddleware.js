const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { userModel, tempUser } = require('../model/user.model')
const getOTP = require('../utils/OTPGenerator')
const { v4: uuidv4 } = require('uuid');
const sendMail = require('../utils/OTP.mail')
const { secretKey } = require('../config/config')
const isEmailValid = require('../utils/validateMail');
const { use } = require('passport');
// let salt = bcrypt.genSaltSync(10);



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

const register = async (req, res, next) => {

  try {
    const { username, mail, password } = req.body

    if (!await isEmailValid(mail)) {
      return res.status(401).json({ message: 'Invalid Mail' })
    }

    let checkUserPresence;
    if (username && mail && password) {
      checkUserPresence = await tempUser.findOneAndDelete({ mail: mail });

      if (checkUserPresence) {
        console.log("I just deleted you");
      }
    }
    else {
      return res.status(401).json({ message: "Halva samje ho kya f***" });
    }

    const otp = getOTP();
    const UniqueID = uuidv4();

    const isMailSent = await sendMail({ receversMail: mail, userOTP: otp, headLine: 'Varify using OTP' });
    if (isMailSent) {

      bcrypt.genSalt(12, function (err, salt) {

        bcrypt.hash(password, salt, async function (err, hash) {
          const user = new tempUser({
            userName: username,
            mail: mail,
            password: hash,
            otp: otp,
            uniqueid: UniqueID,
            expiry: new Date(new Date().getTime() + 10 * 60000)

          })
          const savedObject = await user.save();
          console.log("temp user created Successfully :" + user.mail);

          jwt.sign({ mail: mail, uid: UniqueID }, secretKey, { expiresIn: '10m' }, function (err, token) {
            if (err) {
              console.log("JWT error" + err);
              return res.json({ message: "Internal Server Error" })
            }

            return res.status(200).json({ message: "Your OTP has been sent on " + mail, SecCode: token });
          });
        });
      });

    } else {
      return res.status(500).json({ message: "Failed to send OTP" });
    }

  } catch (error) {
    console.log(error);
    console.log("Temparary user not created : ");
  }

}



const validOTP = async (req, res, next) => {
  try {

    const { SecCode, otp } = req.body;

    if (!(SecCode && otp)) {
      return res.status(401).json({ message: 'Bro I am not your type !!!' })
    }

    jwt.verify(SecCode, secretKey, async function (err, decoded) {

      if (err) {
        return res.status(401).json({ message: 'Suspicious activity detected' });
      }

      const userRecord = await tempUser.findOne({ mail: decoded.mail, uniqueid: decoded.uid });

      if (!userRecord) {
        return res.status(404).json({ message: "Suspicious activity detected : can you plz do one more atempt" });
      }

      if (otp === userRecord.otp) {

        const user = new userModel({
          userName: userRecord.userName, mail: userRecord.mail, password: userRecord.password, expiry: new Date(new Date().getTime() + 120 * 60000)
        })
        const savedRecoed = await user.save();

        jwt.sign({ mail: savedRecoed.mail, exp: savedRecoed.expiry }, secretKey, { expiresIn: '2h' }, function (err, token) {
          if (err) {
            console.log("JWT error" + err);
            return res.status(500).json({ message: "Internal Server Error" })
          }

          return res.status(200).json({ redirect: "/", message: 'Varification Successful', Sec: token });
        });


        res.json({})
      } else {
        return res.status(400).json({ message: 'Incorrect OTP' });
      }
    });

  } catch (error) {
    console.log(error);

  }

}

const signIn = (req, res, next) => {

}

const signOut = (req, res, next) => {

}


module.exports = { register, validOTP };