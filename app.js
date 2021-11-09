const webpush = require('web-push');
var mongoose = require("mongoose");
const express = require('express');
var bodyParser = require('body-parser')
const path = require('path');
var cors = require('cors')
var jsonParser = bodyParser.json()


const publicKey = 'BJxLKs-EcVJpc1DedVAgYoCU0w81CBfASXCBB9hZgSjriF9z23VYPonv86x-7vqIckaUcOSqVT42RBfcG3bJp-Y'
const privateKey = 'u1azylDDg8lcSte9uMuvJfOXqpFVSpVmpdu0-PhKcR8';
webpush.setVapidDetails('mailto:example@yourdomain.org', publicKey, privateKey);

mongoose.connect("mongodb://localhost:27017/notif-devices", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function() {
  console.log("Connection Successful!");
});
var schema = mongoose.Schema({
    name: String,
    age: Number
  });
var Model = mongoose.model("model", schema, "myCollection");

var doc1 = new Model({ name: "John", age: 21 });

doc1.delete(function(err, doc) {
  if (err) return console.error(err);
  console.log("Document inserted succussfully!");
});
const app = express();
var corsOptions = {
    origin: 'https://qazaljalilian.github.io',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
app.use(cors())
app.options('*', cors());
app.listen(4000, () => console.log(`The server is listening on port ${4000}`))
app.use(function (request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
const notificationPayload = {
  "notification": {
      "title": "Angular News",
      "body": "Newsletter Available!",
      "icon": "assets/main-page-logo-small-hat.png",
      "vibrate": [100, 50, 100],
      "data": {
          "dateOfArrival": Date.now(),
          "primaryKey": 1
      },
      "actions": [{
          "action": "explore",
          "title": "Go to the site"
      }]
  }
}
app.post('/subscribe',  cors() ,jsonParser, (req, res) => {
    console.log(req.body);
    webpush.sendNotification(
      req.body, JSON.stringify(notificationPayload) )
    res.status(201).json({})
})
notification =  {
  title: "Your pizza is on the way!",
  body: "Hold tight. We will let you know when your delivery driver is nearby."
}
