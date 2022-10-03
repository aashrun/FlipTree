const movieModel = require("../models/movieModel.js")
const theatreModel = require("../models/theatreModel.js");
const userModel = require("../models/userModel.js");
const validation = require("../validations/validator.js")



//====================================  Creating a movie  ===========================================//

const createMovie = async function (req, res){
    try{
        let body = req.body
        let {movieName, theatreId} = body

        if(validation.emptyBody(body)) return res.status(400).send({status: false, message: "Request cannot be empty!"})


        if(!movieName) return res.status(400).send({status: false, message: "Movie's name is a mandatory input!"})
        if(!validation.isValid(movieName)) return res.status(400).send({status: false, message: "The input string cannot be empty!"})

        let movie = await movieModel.findOne({movieName: movieName})
        if(movie) return res.status(409).send({status: false, message: "Movie already exists!"})
        body.movieName = body.movieName.trim().split(" ").filter(x => x).join(" ")

 
        if(!theatreId) return res.status(400).send({status: false, message: "Reference of the theatre is mandatory!"})
        if(!validation.idMatch(theatreId)) return res.status(400).send({status: false, message: "Invalid theatreId!"})

        let theatre = await theatreModel.findOne({_id: theatreId})
        if(!theatre) return res.status(404).send({status: false, message: "The theatre you're trying to access was not found!"})



        let create = await movieModel.create(body)
        res.status(201).send({status: true, message: "Movie successfully created", data: create})

    }catch(error){
        res.status(500).send({status: false, message: error.message})
    }
};











//====================================  Fetching movie details  ===========================================//

const getMovies = async function (req, res){
    try{
        let userId = req.params.userId
        let body = req.body
        let {movieName} = body

        if(!validation.idMatch(userId)) return res.status(400).send({status: false, message: "Invalid userId!"})
        let user = await userModel.findOne({_id: userId})
        if(!user) return res.status(404).send({status: false, message: "User not found"})


        if(!body){
            let allMovies = await movieModel.find({isDeleted: false})
            if (allMovies.length == 0) return res.status(404).send({ status: false, message: "Movies not found!" })
            return res.status(200).send({ status: true, message: "Books List", data: allMovies })
        }



        if(movieName){
        if(!validation.isValid(movieName)) return res.status(400).send({status: false, message: "The input string cannot be empty!"})
        let movie = await movieModel.findOne({movieName: movieName, isDeleted: false})
        if(!movie) return res.status(404).send({status: false, message: "No such movie found!"})

        res.status(200).send({status: true, message: "Movie details are as follows: ", data: movie})
        }

    }catch(error){
        res.status(500).send({status: false, message: error.message})
    }
}



module.exports = {createMovie, getMovies}