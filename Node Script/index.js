const express = require('express');
const pythonScriptRoute = require("./pythonScriptRoute/route");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use("/pythonscript",pythonScriptRoute)

app.listen(PORT, () => {
    console.log('Server is running on port : ',PORT);
})