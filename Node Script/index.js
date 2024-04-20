const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require("cors");

//load env file
require("dotenv").config({path:"./.env"});

const pythonScriptRoute = require("./pythonScriptRoute/startScriptRoute");
const csvfileUpload = require("./pythonScriptRoute/uploadcsvfileRoute");

//connect to database
require("./config/bdconnection").connect();

//load env file

//initialize express
const app = express();


// const _direname =path.dirname("");
// const buildPath = path.join(_direname, "../frontend/nmms_test/build");
// app.use(express.static(buildPath));

//use cors
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(fileUpload());

//set route for python script
app.use("/pythonscript",pythonScriptRoute);
app.use("/data" , require("./routes/dataRoutes"));
app.use("/file",csvfileUpload);


//define health check
app.get("/health", (req,res)=>{
    console.log("hittt")
    res.json({message:"Server is running"});
})
//define port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server is running on port : ',PORT);
})