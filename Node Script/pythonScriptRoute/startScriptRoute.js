const express = require('express');
const path = require('path');

const {exec} = require('child_process');

//function for the csv file upload

function fileUpload(req ,res,next){
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ message: 'No files were uploaded' });
      }
    
      const uploadedFile = req.files.csvFile;
    
      // Move the uploaded file to the pyscripts folder
      const uploadedFilePathPyscripts = path.join(__dirname, './../../AnalysisModel-main/pyscripts', "gps_test_gabgal.csv");
      uploadedFile.mv(uploadedFilePathPyscripts, (err) => {
        if (err) {
          console.error('Error moving file to pyscripts folder:', err);
          return res.status(500).json({ message: 'Error moving file to pyscripts folder' });
        }
        
        // Move the uploaded file to the AnalysisModel-main folder
        const uploadedFilePathAnalysisModel = path.join(__dirname, './../../AnalysisModel-main', "gps_test_gabgal.csv");
        uploadedFile.mv(uploadedFilePathAnalysisModel, (err) => {
          if (err) {
            console.error('Error moving file to AnalysisModel-main folder:', err);
            return res.status(500).json({ message: 'Error moving file to AnalysisModel-main folder' });
          }
          // Both files moved successfully
          next();
        });
      });
}


//define router
const router = express.Router();


const PythonScriptRunner = (res, scriptPath) => {

    //create reletive path for the bash or the terminal execution
const command = `cd ../AnalysisModel-main && python ${scriptPath} gps_test_gabgal.csv`;

    exec(command, (err, stdout, stderr) => {

        //error accured when the script is executed in terminal 
        if(err){
            console.log({error:err , message:err.message });
            res.json({statuscode:500,status: "error", message: "An error occured", errormessage:err.message});
            return;
        }

        //internal error from the script
        if (stderr){
            console.log({error:stderr , message:stderr.message });
            res.json({statuscode:500,status: "error", message: "An error occured" , errormessage:err.message});
            return;
        }

        //success message

        //send the response to the client
    })
}


router.post('/average-height' ,  fileUpload , (req, res) => {
    try{
        PythonScriptRunner(res,'average_height.py');
        const photopath = "https://nms.topgrowth.in/pyscripts/Tree_height.png"
        res.json({statuscode:200,status: "success", message: "Script executed successfully" , photopath:photopath});

    }
    catch(err){

        console.log(err);
        res.json({statuscode:500,status: "error", message: "An error occured", errormessage:err.message});
    }
});

router.post('/average-width',   fileUpload , (req, res) => {
    try{
    PythonScriptRunner(res, 'average_width.py ');
    const photopath = "https://nms.topgrowth.in/pyscripts/Tree_width.png"

    res.json({statuscode:200,status: "success", message: "Script executed successfully" , photopath:photopath});

    }
    catch(err){
        console.log(err);
        res.json({statuscode:500,status: "error", message: "An error occured", errormessage:err.message});
    }
}); 

router.post('/distribution-map',   fileUpload , (req, res) => {
    try{
    PythonScriptRunner(res, 'distribution_map.py');

    
    const photopath = "https://nms.topgrowth.in/pyscripts/diversity_map.png"

    res.json({statuscode:200,status: "success", message: "Script executed successfully" , photopath:photopath});

    }
    catch(err){
        console.log(err);
        res.json({statuscode:500,status: "error", message: "An error occured", errormessage:err.message});
    }
}); 

router.post('/heatmap-carbonseq',   fileUpload , (req, res) => {
    try{
        PythonScriptRunner(res,'heatmap_carbonseq.py');
        const photopath = "https://nms.topgrowth.in/pyscripts/carbon_seq_gabgal.png"

        

        res.json({statuscode:200,status: "success", message: "Script executed successfully" , photopath:photopath});

    }
    catch(err){
        console.log(err);
        res.json({statuscode:500,status: "error", message: "An error occured", errormessage:err.message});
    }
});

router.post('/pie-diversity',   fileUpload , (req, res) => {
    try{
        PythonScriptRunner(res, 'pie_diversity.py')
        const photopath = "https://nms.topgrowth.in/pyscripts/Distribution.png"


        res.json({statuscode:200,status: "success", message: "Script executed successfully" , photopath:photopath});

    }
    catch(err){
        console.log(err);
        res.json({statuscode:500,status: "error", message: "An error occured", errormessage:err.message});
    }
})

router.post('/infographic',  fileUpload , (req, res) => {
    try{
        PythonScriptRunner(res, 'infographics.py');
        
        const photopath = "https://nms.topgrowth.in/pyscripts/edited_SummaryConceptNMS.png"
        
        res.json({statuscode:200,status: "success", message: "Script executed successfully" , photopath:photopath});

    }
    catch(err){
        console.log(err);
        res.json({statuscode:500,status: "error", message: "An error occured", errormessage:err.message});
    }
}); 

router.post('/merged-script' ,  fileUpload ,async (req, res) => {
    try{
       await PythonScriptRunner(res,'merged_script.py');

        // const photopath = "/Users/harshilvasoya/Desktop/nms/AnalysisModel-main/pyscripts/final_report.pdf"
        const photopath = "https://du-website.s3.ap-south-1.amazonaws.com/U01/Faculty-Photo/15---28-04-2023-02-07-35.jpg"
        res.json({statuscode:200,status: "success", message: "Script executed successfully" , photopath:photopath});

    }
    catch(err){
        console.log(err);
        res.json({statuscode:500,status: "error", message: "An error occured", errormessage:err.message});
    }
});


module.exports = router;
