const mongoose = require('mongoose');

//Schema defines the structure of the document we will save in the collection 
const Schema = mongoose.Schema;

const guideSchema = new Schema( {

    title: {
        type: String,
        required: true,
    },

    snippet: {
        type: String,
        required: true,
    },

    body: {
        type: String,
        required: true,
    },

    game: {
        type: String,
        required: true,
    },

    difficulty: {
        type: String,
        required: false,
    }, 
}, {timestamps: true}); //assigns data with certain timestamps

const Guide = mongoose.model('Guide', guideSchema);
module.exports = Guide;