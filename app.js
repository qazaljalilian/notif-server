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
const server = app.listen(process.env.PORT || 5000, () => {
  const port = server.address().port;
  console.log(`Express is working on port ${port}`);
});
app.use(function (request, response, next) {
  response.header("Access-Control-Allow-Origin", "https://qazaljalilian.github.io/");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
const notificationPayload = {
  "notification": {
      "title": "Palette!",
      "body": "welcome to Palette! you are being honored to see the very first notifications!",
      "vibrate": [100, 50, 100],
      "data": {
          "dateOfArrival": Date.now(),
          "primaryKey": 1
      },
      "actions": [{
          "action": "explore",
          "title": "Go to the site"
      }],
      "data": {
        "url": "https://pwa-backend-qazal.herokuapp.com",
        "favorite_count": 0,
        "retweet_count": 0
      }
  }
}
app.get('/',  cors() ,jsonParser, (req, res) => {
  res.send('woooohooooo you made it');
  res.status(201).json({})
})
app.post('/subscribe',  cors() ,jsonParser, (req, res) => {
    console.log(req.body);
   setTimeout(() => {
    webpush.sendNotification(
      req.body, JSON.stringify(notificationPayload) )
   }, 3000);
 
    res.status(201).json({})
})
notification =  {
  title: "Your pizza is on the way!",
  body: "Hold tight. We will let you know when your delivery driver is nearby."
}
