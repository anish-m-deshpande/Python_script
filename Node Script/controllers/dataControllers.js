const Data = require("../models/data");

function calculateCarbonValue(height, width) {
    var Tbv = 0.4 * width * width * height;
  var AGB = 0.7 * Tbv;
  var BGB = AGB * 0.26;
  var TB = AGB + BGB;
  var C = TB / 2;
  var CS = C * 3.6663;
  return CS;
}

exports.postData = async (req, res) => {
    try {
        console.log(req.body);
        const { Latitude, Longitude, Height, Width , SpeciesName} = req.body;

        if (!Latitude || !Longitude || !Height || !Width || !SpeciesName) {
            return res.status(400).json({ error: "All fields are mandatory" });
        }
        

        CarbonVallue = calculateCarbonValue(Height, Width);
        const data = new Data({ Latitude, Longitude, Height, Width , SpeciesName , CarbonVallue});
        await data.save();
        res.status(200).json({ message: "Data saved successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

