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

        //send the response to the client
    })
}


router.post('/average-height', (req, res) => {
    try{
        PythonScriptRunner(res,'average_height.py');
        const photopath = "/Users/harshilvasoya/Desktop/nms/AnalysisModel-main/pyscripts/Tree_height.png"
        res.json({statuscode:200,status: "success", message: "Script executed successfully" , photopath:photopath});

    }
    catch(err){

        console.log(err);
        res.json({statuscode:500,status: "error", message: "An error occured", errormessage:err.message});
    }
});

router.post('/average-width', (req, res) => {
    try{
    PythonScriptRunner(res, 'average_width.py ');
    const photopath = "/Users/harshilvasoya/Desktop/nms/AnalysisModel-main/pyscripts/Tree_width.png"

    res.json({statuscode:200,status: "success", message: "Script executed successfully" , photopath:photopath});

    }
    catch(err){
        console.log(err);
        res.json({statuscode:500,status: "error", message: "An error occured", errormessage:err.message});
    }
}); 

router.post('/distribution-map', (req, res) => {
    try{
    PythonScriptRunner(res, 'distribution_map.py');
    const photopath = "/Users/harshilvasoya/Desktop/nms/AnalysisModel-main/pyscripts/diversity_map.png"

    res.json({statuscode:200,status: "success", message: "Script executed successfully" , photopath:photopath});

    }
    catch(err){
        console.log(err);
        res.json({statuscode:500,status: "error", message: "An error occured", errormessage:err.message});
    }
}); 

router.post('/heatmap-carbonseq', (req, res) => {
    try{
        PythonScriptRunner(res,'heatmap_carbonseq.py');
        const photopath = "/Users/harshilvasoya/Desktop/nms/AnalysisModel-main/pyscripts/carbon_seq_gabgal.png"

        res.json({statuscode:200,status: "success", message: "Script executed successfully" , photopath:photopath});

    }
    catch(err){
        console.log(err);
        res.json({statuscode:500,status: "error", message: "An error occured", errormessage:err.message});
    }
});

router.post('/pie-diversity', (req, res) => {
    try{
        PythonScriptRunner(res, 'pie_diversity.py')
        const photopath = "/Users/harshilvasoya/Desktop/nms/AnalysisModel-main/pyscripts/Distribution.png"

        res.json({statuscode:200,status: "success", message: "Script executed successfully" , photopath:photopath});

    }
    catch(err){
        console.log(err);
        res.json({statuscode:500,status: "error", message: "An error occured", errormessage:err.message});
    }
})

router.post('/infographic', (req, res) => {
    try{
        PythonScriptRunner(res, 'infographics.py');
        const photopath = "/Users/harshilvasoya/Desktop/nms/AnalysisModel-main/pyscripts/infographic.png"
        res.json({statuscode:200,status: "success", message: "Script executed successfully" , photopath:photopath});

    }
    catch(err){
        console.log(err);
        res.json({statuscode:500,status: "error", message: "An error occured", errormessage:err.message});
    }
}); 

router.post('/merged-script', async(req, res) => {
    try{
       await PythonScriptRunner(res,'merged_script.py');

        const photopath = "/Users/harshilvasoya/Desktop/nms/AnalysisModel-main/pyscripts/final_report.pdf"
        res.json({statuscode:200,status: "success", message: "Script executed successfully" , photopath:photopath});

    }
    catch(err){
        console.log(err);
        res.json({statuscode:500,status: "error", message: "An error occured", errormessage:err.message});
    }
});


module.exports = router;
