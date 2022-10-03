const movieModel = require("../models/movieModel.js")
const theatreModel = require("../models/theatreModel.js")
const validation = require("../validations/validator.js")



//====================================  Creating a movie  ===========================================//

const createMovie = async function (req, res){
    try{
        let body = req.body
        let {movieName, theatreId} = body

        if(validation.emptyBody(body)) return res.status(400).send({status: false, message: "Request cannot be empty!"})


        if(!movieName) return res.status(400).send({status: false, message: "Movie's name is a mandatory input!"})
        if(!validation.isValid(movieName)) return res.status(400).send({status: false, message: "The input string cannot be empty!"})
        body.movieName = body.movieName.trim().split(" ").filter(x => x).join(" ")

 
        if(!theatreId) return res.status(400).send({status: false, message: "Reference of the theatre is mandatory!"})
        if(!validation.idMatch(theatreId)) return res.status(400).send({status: false, message: "Invalid theatreId!"})

        let theatre = await theatreModel.findOne({_id: theatreId})
        if(!theatre) return res.status(404).send({status: false, message: "the theatre you're trying to access was not found!"})



        let create = await movieModel.create(body)
        res.status(201).send({status: true, message: "Movie successfully created", data: create})

    }catch(error){
        res.status(500).send({status: false, message: error.message})
    }
};











//====================================  Fetching movie details  ===========================================//

const getMovie = async function (req, res){
    try{}catch(error){
        res.status(500).send({status: false, message: error.message})
    }
}



module.exports = {createMovie}