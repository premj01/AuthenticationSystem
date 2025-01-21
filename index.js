const express = require('express')
const app = express();
const { port, hostname } = require('./config/config')
const router = require('./router/route')
const cors = require('cors');

app.use(cors());


app.use(express.json());
app.use("/", router);

app.get("/", (req, res) => {
  res.send("Nikal BC");
});

app.listen(port, () => {
  console.log(`Server Started on PORT http://${hostname}:${port}`);
});