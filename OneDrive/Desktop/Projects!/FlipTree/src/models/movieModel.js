const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const movieSchema = new mongoose.Schema({
    movieName : {
        type : String,
        required : true,
        unique: true
    },
    theatreId : {
        type : ObjectId,
        ref : "Theatre",
        required : true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

}, {timestamps : true})

module.exports = mongoose.model('Movie', movieSchema)