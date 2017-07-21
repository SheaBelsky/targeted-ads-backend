const express = require('express');
const app = express();

const multer  = require('multer')
const path = require('path')

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage });
const auto_reap = require('multer-autoreap');
app.use(auto_reap)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Configure routes
require('./VR.js')(app, upload);

app.get('/', function (req, res) {
  res.send('Hello World!')
})

var port = process.env.PORT || process.env.VCAP_APP_PORT || 3000;

app.listen(port, function() {
  // eslint-disable-next-line
  console.log('Server running on port: %d', port);
});
