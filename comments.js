// Create a web server
var express = require('express');
var router = express.Router();
var fs = require('fs');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var app = express();
var comments = require('../comments.json');
var path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// GET /comments
router.get('/', function(req, res) {
  res.json(comments);
});

// POST /comments
router.post('/', function(req, res) {
  comments.push(req.body);
  fs.writeFile(path.join(__dirname, '../comments.json'), JSON.stringify(comments), function(err) {
    if (err) {
      console.log('Error: ', err);
    }
  });
  res.json(comments);
});

module.exports = router;
