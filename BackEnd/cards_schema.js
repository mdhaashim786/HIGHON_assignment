const mongoose = require('mongoose');
const cardsSchema = new mongoose.Schema(
    {
        "code": String,
        "title": String,
        "description": {
            type: String,
            length: 300
        }
    }
);

module.exports = mongoose.model("cards", cardsSchema);