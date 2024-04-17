const express = require('express');


const {exec} = require('child_process');
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

        console.log(stdout);

        //send the response to the client
        res.json({statuscode:200,status: "success", message: "Script executed successfully" , data:stdout});
    })
}


router.get('/average-height', (req, res) => {
    try{
        PythonScriptRunner(res,'average_height.py');
    }
    catch(err){

        console.log(err);
        res.json({statuscode:500,status: "error", message: "An error occured", errormessage:err.message});
    }
});

router.get('/average-width', (req, res) => {
    try{
    PythonScriptRunner(res, 'average_width.py ');
    }
    catch(err){
        console.log(err);
        res.json({statuscode:500,status: "error", message: "An error occured", errormessage:err.message});
    }
}); 

router.get('/distribution-map', (req, res) => {
    try{
    PythonScriptRunner(res, 'distribution_map.py');
    }
    catch(err){
        console.log(err);
        res.json({statuscode:500,status: "error", message: "An error occured", errormessage:err.message});
    }
}); 

router.get('/heatmap-carbonseq', (req, res) => {
    try{
        PythonScriptRunner(res,'heatmap_carbonseq.py');

    }
    catch(err){
        console.log(err);
        res.json({statuscode:500,status: "error", message: "An error occured", errormessage:err.message});
    }
});

router.get('/pie-diversity', (req, res) => {
    try{
        PythonScriptRunner(res, 'pie_diversity.py')

    }
    catch(err){
        console.log(err);
        res.json({statuscode:500,status: "error", message: "An error occured", errormessage:err.message});
    }
})

router.get('/infographic', (req, res) => {
    try{
        PythonScriptRunner(res, 'infographics.py');

    }
    catch(err){
        console.log(err);
        res.json({statuscode:500,status: "error", message: "An error occured", errormessage:err.message});
    }
}); 

router.get('/merged-script', (req, res) => {
    try{
        PythonScriptRunner(res,'merged_script.py');
    }
    catch(err){
        console.log(err);
        res.json({statuscode:500,status: "error", message: "An error occured", errormessage:err.message});
    }
});


module.exports = router;
