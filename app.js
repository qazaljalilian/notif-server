const webpush = require('web-push');
const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')
var jsonParser = bodyParser.json();


const publicKey = 'BJxLKs-EcVJpc1DedVAgYoCU0w81CBfASXCBB9hZgSjriF9z23VYPonv86x-7vqIckaUcOSqVT42RBfcG3bJp-Y'
const privateKey = 'u1azylDDg8lcSte9uMuvJfOXqpFVSpVmpdu0-PhKcR8';
webpush.setVapidDetails('mailto:qazal.jalilian@palettesoftware.com', publicKey, privateKey);


const app = express();
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
      "body": "welcome to Palette! you are being honored to see the very first notification!",
      "vibrate": [100, 50, 100],
      "data": {
          "dateOfArrival": Date.now(),
          "primaryKey": 1
      },
      "actions": [{
          "action": "open",
          "title": "Open the app"
      }],
      "data": {
        "url": "https://qazaljalilian.github.io/?success",
        "favorite_count": 0,
        "retweet_count": 0
      }
  }
}
app.get('/',  cors() ,jsonParser, (req, res) => {
  res.send('woooohooooo you made it');
})
app.post('/subscribe',  cors() ,jsonParser, (req, res) => {
    console.log(req.body);
   setTimeout(() => {
    webpush.sendNotification(
      req.body, JSON.stringify(notificationPayload) )
   }, 3000);
 
    res.status(201).json({})
})

