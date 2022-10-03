const movieModel = require("../models/movieModel.js")
const showModel = require("../models/showModel.js")
const validation = require("../validations/validator.js")



//====================================  Creating a show  ===========================================//

const createShow = async function (req, res){
    try{
        let body = req.body
        let {movieId, timeSlotsAndSeats} = body

        if(validation.emptyBody(body)) return res.status(400).send({status: false, message: "Request cannot be empty!"})



        if(!movieId) return res.status(400).send({status: false, message: "Reference of the movie is mandatory!"})
        if(!validation.idMatch(movieId)) return res.status(400).send({status: false, message: "Invalid movieId!"})

        let movie = await movieModel.findOne({_id: movieId})
        if(!movie) return res.status(404).send({status: false, message: "No such movie found!"})


        if(!timeSlotsAndSeats) return res.status(400).send({status: false, message: "Time slots and seats are required!"})
        if(timeSlotsAndSeats.length == 0) return res.status(400).send({status: false, message: "Please provide with the details regarding the time slots and seats!"})


        let create = await showModel.create(body)
        res.status(201).send({status: true, message: "Show successfully created", data: create})

    }catch(error){
        res.status(500).send({status: false, message: error.message})
    }
};

module.exports = {createShow}