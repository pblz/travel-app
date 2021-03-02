var express = require('express');
var router = express.Router();

// Define the about route
router.get('/about', function(req, res) {
    res.send('About us');
  });
  
  
  module.exports = router;