const express = require('express')
const app = express();
const { port, hostname, db } = require('./config/config')
const router = require('./router/route')
const cors = require('cors');
const ConnectDB = require('./config/config.db');
ConnectDB(db);


const User = require('./model/user.model')
const bcrypt = require('bcryptjs');

let salt = bcrypt.genSaltSync(10);

// bcrypt.genSalt(13, function (err, salt) {

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

const prem = async () => {
  const obj = await User.findOne({ mail: 'premj12@gmail.com' })

  if (obj) {
    bcrypt.compare("premJadhavBro", obj.password).then((res) => {
      res ? console.log("Nice dude") : console.log("fuck you")

    });

  } else {
    console.log("user not valid ");

  }



}

prem();

// bcrypt.compare("B4c0/\/", hash).then((res) => {
//   // res === true
// });




app.use(cors());


app.use(express.json());
app.use("/", router);

app.get("/", (req, res) => {
  res.send("Nikal BC");
});

app.listen(port, () => {
  console.log(`Server Started on PORT http://${hostname}:${port}`);
});