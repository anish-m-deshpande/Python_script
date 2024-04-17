const express = require('express');
const path = require('path');

//define router
const router = express.Router();

  
  // Endpoint to handle file upload
  router.post('/upload',  (req, res) => {
    console.log("hitt")
    console.log(req.files);
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ message: 'No files were uploaded' });
      }
    
      const uploadedFile = req.files.csvFile;
    
      // Move the uploaded file to the pyscripts folder
      const uploadedFilePathPyscripts = path.join(__dirname, './../../AnalysisModel-main/pyscripts', uploadedFile.name);
      uploadedFile.mv(uploadedFilePathPyscripts, (err) => {
        if (err) {
          console.error('Error moving file to pyscripts folder:', err);
          return res.status(500).json({ message: 'Error moving file to pyscripts folder' });
        }
        
        // Move the uploaded file to the AnalysisModel-main folder
        const uploadedFilePathAnalysisModel = path.join(__dirname, './../../AnalysisModel-main', uploadedFile.name);
        uploadedFile.mv(uploadedFilePathAnalysisModel, (err) => {
          if (err) {
            console.error('Error moving file to AnalysisModel-main folder:', err);
            return res.status(500).json({ message: 'Error moving file to AnalysisModel-main folder' });
          }
          // Both files moved successfully
          res.status(200).json({ message: 'File uploaded successfully to both locations' });
        });
      });
  });


module.exports = router;
