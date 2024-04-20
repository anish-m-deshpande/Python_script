const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
   Latitude: {
         type: String,
         required: true
    },
    Longitude: {
        type: String,
        required: true
    },
    Height: {
        type: Number,
        required: true
    },
    Width: {
        type: Number,
        required: true
    },
    SpeciesName :{
        type: String,
        required: true
    },
    CarbonVallue:{
        type: Number,
        required: true
    }
    })

    module.exports = mongoose.model("data", dataSchema);