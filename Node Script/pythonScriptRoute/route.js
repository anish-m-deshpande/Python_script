const express = require('express');


const {exec} = require('child_process');

//define router
const router = express.Router();

const PythonScriptRunner = (res, scriptPath) => {
    exec(`python ${scriptPath}`, (err, stdout, stderr) => {
        if(err){
            console.log({error:err , message:err.message });
            res.json({statuscode:500,status: "error", message: "An error occured"});
            return;
        }
        if (stderr){
            console.log({error:stderr , message:stderr.message });
            res.json({statuscode:500,status: "error", message: "An error occured"});
            return;
        }
        console.log(stdout);

        res.json({statuscode:200,status: "success", message: "Script executed successfully"});
    })
}
const pythonfilepath ="./../AnalysisModel-main/"
router.get('/average-height', (req, res) => {
    PythonScriptRunner(res, pythonfilepath +'average_height.py');
});
router.get('/temp',(req,res)=>{
    PythonScriptRunner(res, pythonfilepath +'temp.py');
})
router.get('/average-width', (req, res) => {
    PythonScriptRunner(res, pythonfilepath +'average_width.py');
}); 

router.get('/distribution-map', (req, res) => {
    PythonScriptRunner(res, pythonfilepath +'distribution_map.py');
}); 

router.get('/heatmap-carbonseq', (req, res) => {
    PythonScriptRunner(res, pythonfilepath +'heatmap_carbonseq.py');
});

router.get('/pie-diversity', (req, res) => {
    PythonScriptRunner(res, pythonfilepath +'pie_diversity.py')
})

router.get('/infographic', (req, res) => {
    PythonScriptRunner(res, pythonfilepath +'infographics.py');
}); 

router.get('/merged-script', (req, res) => {
    PythonScriptRunner(res, pythonfilepath +'merged_script.py');
});

module.exports = router;
