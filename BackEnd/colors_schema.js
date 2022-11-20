const mongoose = require('mongoose');
const colorsSchema = new mongoose.Schema({
    "_id": Number,
    "name": String,
    "code": String,
    "Qualities": {
        "SYMBOLIZES": [String],
        "EFFECTS": [String],
        "POSITIVE": [String],
        "NEGATIVE": [String]
    }
});

module.exports = mongoose.model("colors", colorsSchema);