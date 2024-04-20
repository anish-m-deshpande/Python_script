const express = require('express');
const { postData } = require('../controllers/dataControllers');

//define router
const router = express.Router();

  
  // Endpoint to handle file upload
  router.post('/adddata', postData );

  module.exports = router;  