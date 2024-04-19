const express = require('express');
const path = require('path');

//define router
const router = express.Router();

  
  // Endpoint to handle file upload
  router.get('/upload',  (req, res) => {
    res.json({ message: 'File uploaded successfully' });
  });


module.exports = router;
