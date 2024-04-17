const express = require('express');
const cors = require("cors");
const path = require("path");
const pythonScriptRoute = require("./pythonScriptRoute/route");

//load env file
require("dotenv").config();

//initialize express
const app = express();


const _direname =path.dirname("");
const buildPath = path.join(_direname, "../frontend/nmms_test/build");
app.use(express.static(buildPath));

//use cors
app.use(cors());

//set route for python script
app.use("/pythonscript",pythonScriptRoute);

//define port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server is running on port : ',PORT);
})