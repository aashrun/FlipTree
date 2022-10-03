const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const showSchema = new mongoose.Schema({
    movieId : {
        type : ObjectId,
        ref : "Movie",
        required : true
    },
    timeSlotsAndSeats : {
        type : Object,
        required: true
    }

}, {timestamps : true})

module.exports = mongoose.model('Show', showSchema)