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
    header = req.headers
header.Add("Access-Control-Allow-Origin", "*")
header.Add("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
header.Add("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
    webpush.sendNotification(
      req.body, JSON.stringify(notificationPayload) )
    res.status(201).json({})
})
notification =  {
  title: "Your pizza is on the way!",
  body: "Hold tight. We will let you know when your delivery driver is nearby."
}
