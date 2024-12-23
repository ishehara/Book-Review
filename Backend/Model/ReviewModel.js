const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    BookTitle: {
        type: String,
        required: true,
    },
    Author: {
        type: String,
        required: true,
    },
    Rating: {
        type: String,
        required: true,
    },
    ReviewText: {
        type: String,
        required: true,
    },
    Date: {
        type: Date,
        default: Date.now, // Auto-generated date
    },
});

module.exports = mongoose.model("Review", reviewSchema); // Correctly export the model
