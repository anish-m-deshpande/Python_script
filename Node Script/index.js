const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require("cors");
const path = require("path");
const pythonScriptRoute = require("./pythonScriptRoute/startScriptRoute");
const csvfileUpload = require("./pythonScriptRoute/uploadcsvfileRoute");

//load env file
require("dotenv").config();

//initialize express
const app = express();


const _direname =path.dirname("");
const buildPath = path.join(_direname, "../frontend/nmms_test/build");
app.use(express.static(buildPath));

//use cors
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(fileUpload());

//set route for python script
app.use("/pythonscript",pythonScriptRoute);
app.use("/file",csvfileUpload);

//define port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server is running on port : ',PORT);
})